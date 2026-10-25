# Cap Citoyen API scaffold

FastAPI backend scaffold for optional interview-answer coaching. It is not deployed
and does not enable AI feedback until a compatible model provider and server-side
credentials are configured.

## Local development

Use Python 3.11+ (the container uses Python 3.12):

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Health: http://127.0.0.1:8000/health  
OpenAPI docs: http://127.0.0.1:8000/docs

## Configuration

Set `LLM_API_KEY`, `LLM_MODEL`, and optionally `LLM_BASE_URL` in the server
environment. The provider adapter uses an OpenAI-compatible Chat Completions API
with JSON mode. Do not put credentials in the static frontend or commit a real
`.env` file. If provider settings are missing, the feedback endpoint returns
HTTP 503.

Set `CORS_ORIGINS` to the exact trusted frontend origins. Avoid wildcard origins
in production. The initial rate limiter is process-local and is not sufficient
as the only production abuse control behind multiple workers or replicas.

## Tests

```bash
pytest -q
```

## Privacy and production checklist

- The API does not persist interview answers and does not log their contents.
- Keep request/response body logging disabled at the proxy and hosting layers too.
- Use HTTPS, provider quotas, edge-level rate limiting, request timeouts and monitoring.
- Configure a trusted proxy before using forwarded client-IP headers.
- Review the selected model provider's data handling and retention terms.
- Run tests and a security review before connecting the frontend or deploying publicly.
