from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_feedback_rejects_empty_answer():
    response = client.post(
        "/api/v1/interview/feedback",
        json={
            "topic_id": "motivations",
            "question": "Pourquoi souhaites-tu acquérir la nationalité française ?",
            "answer": "   ",
            "language": "fr",
        },
    )
    assert response.status_code == 422


def test_feedback_rejects_unknown_fields():
    response = client.post(
        "/api/v1/interview/feedback",
        json={
            "topic_id": "motivations",
            "question": "Pourquoi souhaites-tu acquérir la nationalité française ?",
            "answer": "Je souhaite expliquer mes motivations.",
            "language": "fr",
            "full_name": "Do not accept personal data fields",
        },
    )
    assert response.status_code == 422


def test_feedback_fails_closed_when_provider_not_configured(monkeypatch):
    from app import main
    from app.config import Settings

    monkeypatch.setattr(
        main,
        "settings",
        Settings(llm_api_key="", llm_model=""),
    )
    response = client.post(
        "/api/v1/interview/feedback",
        json={
            "topic_id": "motivations",
            "question": "Pourquoi souhaites-tu acquérir la nationalité française ?",
            "answer": "Je souhaite expliquer mes motivations.",
            "language": "fr",
        },
    )
    assert response.status_code == 503
