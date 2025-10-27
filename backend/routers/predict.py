from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional
import numpy as np

# Create router with API prefix and swagger documentation tag
router = APIRouter(prefix="/api", tags=["Prediction"])

# Request validation schema
class PredictRequest(BaseModel):
    text: str = Field(
        ...,  # Required field
        min_length=3,
        max_length=5000,
        example="Win a FREE iPhone now!"
    )

# Response schema defining the prediction output format
class PredictResponse(BaseModel):
    prediction: str     # "Spam" or "Ham"
    score: float        # Confidence score (0-1)

#  POST Endpoint
@router.post("/predict", response_model=PredictResponse, summary="Classify message as Spam or Ham")
def predict_text(req: PredictRequest, request: Request):
    """Predict spam or ham using the loaded ML model from app.state"""
    text = req.text.strip()

    # Validate text
    if not text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    # Load model & vectorizer from FastAPI app state
    MODEL = getattr(request.app.state, "MODEL", None)
    VEC = getattr(request.app.state, "VEC", None)

    if MODEL is None or VEC is None:
        raise HTTPException(status_code=500, detail="Model or vectorizer not loaded. Please restart the API server.")

    try:
        # Vectorize input
        X = VEC.transform([text])

        # Predict and get confidence
        if hasattr(MODEL, "predict_proba"):
            probs = MODEL.predict_proba(X)[0]
            pred_idx = int(np.argmax(probs))
            confidence = float(probs[pred_idx])
        else:
            pred_idx = int(MODEL.predict(X)[0])
            confidence = 1.0

        prediction = "Spam" if pred_idx == 1 else "Ham"

        return PredictResponse(prediction=prediction, score=round(confidence, 4))

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

