from fastapi import APIRouter
from app.services.environment_service import get_latest_environment

router = APIRouter(
    prefix="/environment",
    tags=["Environment"]
)

@router.get("/latest")
async def latest_environment(city: str):
    return await get_latest_environment(city)