# Router module that exposes a simple health/info endpoint for the ML service.
# It reports service status and the filenames of the currently used model and vectorizer.

from fastapi import APIRouter
import os
import joblib
import json

# Create router with /api prefix and "Info" tag for API docs
router = APIRouter(prefix="/api", tags=["Info"])

@router.get("/info", summary="Get model and vectorizer information")
def get_model_info():
    # Construct paths to model artifacts relative to this module
    model_path = os.path.join("..", "models", "CalibratedSVM.joblib") # Model
    vec_path = os.path.join("..", "models", "vectorizer.joblib") # Vectorizer
    meta_path = os.path.join("..", "models", "final_info.json") # Info Model

    # Calculate sizes in megabytes
    model_size = os.path.getsize(model_path) / (1024 * 1024)
    vec_size = os.path.getsize(vec_path) / (1024 * 1024)

    # Load additional metadata from JSON if available
    metadata = {}
    if os.path.exists(meta_path):
        try:
            with open(meta_path, "r") as f:
                metadata = json.load(f)
        except Exception:
            metadata = {"error": "Could not read final_info.json"}
            
    # Return comprehensive service information
    return {
        "project": "Spamurai - Spam Detection Website using ML",
        "course": "2025-HS2-COS30049-Computing Technology Innovation Project-H1",
        "model": {
            "file": "CalibratedSVM.joblib",
            "size_MB": round(model_size, 2),
            "type": metadata.get("model_type", "Calibrated Linear SVM"),
        },
        "vectorizer": {
            "file": "vectorizer.joblib",
            "size_MB": round(vec_size, 2),
            "type": metadata.get("vectorizer", "TF-IDF"),
        },
        "version": "1.0.0",
        "author": "Group 5 - Session 10",
    }
