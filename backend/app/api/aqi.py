from fastapi import APIRouter
from app.services.aqi_service import get_latest_aqi
from app.models.aqi import AQIResponse

router = APIRouter(
    prefix="/aqi",
    tags=["AQI"]
)

@router.get("/latest", response_model=AQIResponse)
def latest_aqi():
    return get_latest_aqi()