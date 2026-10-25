import time
from collections import defaultdict, deque
from threading import Lock

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import get_settings
from .schemas import FeedbackRequest, FeedbackResponse
from .service import ProviderUnavailable, create_feedback

settings = get_settings()
app = FastAPI(
    title="Cap Citoyen API",
    version="0.1.0",
    description="API pédagogique facultative pour le coaching d'entretien.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Lightweight per-process limiter for the initial scaffold. For multiple workers
# or replicas, replace this with a shared store such as Redis at the edge/API layer.
_requests: dict[str, deque[float]] = defaultdict(deque)
_rate_lock = Lock()


def _client_key(request: Request) -> str:
    # Do not trust X-Forwarded-For unless a trusted proxy is configured explicitly.
    return request.client.host if request.client else "unknown"


def _rate_limited(request: Request) -> bool:
    now = time.monotonic()
    cutoff = now - 60
    key = _client_key(request)
    with _rate_lock:
        hits = _requests[key]
        while hits and hits[0] < cutoff:
            hits.popleft()
        if len(hits) >= max(1, settings.max_requests_per_minute):
            return True
        hits.append(now)
        return False


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "cap-citoyen-api"}


@app.post("/api/v1/interview/feedback", response_model=FeedbackResponse)
async def interview_feedback(payload: FeedbackRequest, request: Request) -> FeedbackResponse:
    if _rate_limited(request):
        return JSONResponse(
            status_code=429,
            content={"detail": "Trop de demandes. Réessaie dans une minute."},
            headers={"Retry-After": "60"},
        )
    try:
        return await create_feedback(payload, settings)
    except ProviderUnavailable as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc),
            headers={"Retry-After": "30"},
        ) from exc
