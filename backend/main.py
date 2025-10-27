from fastapi import FastAPI
from contextlib import asynccontextmanager
import joblib, os
from routers import predict, info


# Global references to ML model and vectorizer
MODEL, VEC = None, None

@asynccontextmanager
async def lifespan(app: FastAPI):
    model_path = os.path.join("..", "models", "CalibratedSVM.joblib")
    vec_path = os.path.join("..", "models", "vectorizer.joblib")

    # Load ML artifacts when server starts
    print("----- Loading model and vectorizer... -----")
    MODEL = joblib.load(model_path)
    VEC = joblib.load(vec_path)
    print("----- Model and vectorizer loaded successfully!-----")

    app.state.MODEL = MODEL
    app.state.VEC = VEC
    
    yield  # startup done, now app runs
    # Cleanup when server shuts down
    print("----- App shutting down... ------")

# Initialize FastAPI application with metadata and lifespan handler
app = FastAPI(
    title="Spam Detection API",
    version="1.0",
    lifespan=lifespan
)

# Allow frontend (React) to access
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(info.router)     # Service health/info endpoints
app.include_router(predict.router)  # ML prediction endpoints

#  Root Endpoint
@app.get("/", tags=["Root"])
def root():
    """
    Root endpoint for basic API check.
    """
    return {
        "message": "Spamurai API is running!",
        "docs": "Visit /docs for API testing interface",
        "predict": "POST /api/predict to classify messages",
    }