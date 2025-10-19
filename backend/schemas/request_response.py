from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    text: str = Field(min_length=3, description="Email or message content")

class PredictResponse(BaseModel):
    prediction: str
    score: float  # probability score

class InfoResponse(BaseModel):
    status: str
    model: str
    vectorizer: str
