from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, field_validator


class FeedbackRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    topic_id: str = Field(min_length=1, max_length=80, pattern=r"^[a-zA-Z0-9_-]+$")
    question: str = Field(min_length=5, max_length=1200)
    answer: str = Field(min_length=1, max_length=5000)
    language: Literal["fr"] = "fr"

    @field_validator("answer")
    @classmethod
    def answer_must_contain_non_whitespace(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("La réponse ne peut pas être vide.")
        return value


class CriterionFeedback(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: Literal["relevance", "structure", "example", "civic_accuracy"]
    status: Literal["good", "partial", "missing", "not_applicable"]
    feedback: str = Field(min_length=1, max_length=500)


class FeedbackResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    summary: str = Field(min_length=1, max_length=800)
    criteria: list[CriterionFeedback] = Field(min_length=3, max_length=4)
    follow_up_question: str = Field(min_length=1, max_length=500)
    disclaimer: str = (
        "Retour pédagogique non officiel. Aucun avis sur l'éligibilité "
        "ou l'issue d'une demande de naturalisation."
    )
