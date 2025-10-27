from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    # Incoming request must include a text field (short messages are rejected).
    text: str = Field(min_length=3, description="Email or message content")

class PredictResponse(BaseModel):
    # Human-readable label ("Spam" / "Ham") and a probability score for the positive class.
    prediction: str
    score: float  # probability score (0.0 - 1.0)

class InfoResponse(BaseModel):
    # Simple service health/info metadata returned by the /info endpoint.
    status: str          # e.g. "ok"
    model: str           # filename of the serialized ML model in use
    vectorizer: str      # filename of the serialized text vectorizer in us
