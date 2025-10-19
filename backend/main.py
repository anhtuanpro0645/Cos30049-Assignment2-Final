from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib, os
from routers import predict, info

app = FastAPI(title="Spam Detection API", version="1.0")

# Allow frontend (React) to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model & vectorizer on startup
MODEL, VEC = None, None

@app.on_event("startup")
def load_model():
    global MODEL, VEC
    model_path = os.path.join("..", "models", "CalibratedSVM.joblib")
    vec_path = os.path.join("..", "models", "vectorizer.joblib")

    MODEL = joblib.load(model_path)
    VEC = joblib.load(vec_path)
    print("✅ Model and vectorizer loaded successfully!")

# Include routers
app.include_router(info.router)
app.include_router(predict.router)
