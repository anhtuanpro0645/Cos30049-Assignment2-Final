from fastapi import APIRouter, HTTPException
from schemas.request_response import PredictRequest, PredictResponse
from utils.preprocess import clean_text
import joblib, os
import numpy as np

router = APIRouter(prefix="/api", tags=["predict"])

# Load model + vectorizer (lazy load)
MODEL_PATH = os.path.join("..", "models", "CalibratedSVM.joblib")
VEC_PATH = os.path.join("..", "models", "vectorizer.joblib")

MODEL = joblib.load(MODEL_PATH)
VEC = joblib.load(VEC_PATH)

@router.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        text = clean_text(req.text)
        X = VEC.transform([text])

        if hasattr(MODEL, "predict_proba"):
            proba = MODEL.predict_proba(X)[0][1]
        else:
            raw_score = MODEL.decision_function(X)[0]
            proba = float(1 / (1 + np.exp(-raw_score)))  # sigmoid

        y_pred = MODEL.predict(X)[0]
        label = "Spam" if y_pred == 1 else "Ham"

        return PredictResponse(prediction=label, score=round(float(proba), 3))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
