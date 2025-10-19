from fastapi import APIRouter
from schemas.request_response import InfoResponse

router = APIRouter(tags=["info"])

@router.get("/info", response_model=InfoResponse)
def get_info():
    return InfoResponse(
        status="ok",
        model="CalibratedSVM.joblib",
        vectorizer="vectorizer.joblib"
    )
