from fastapi import APIRouter, HTTPException, status
from app.services.aqi_service import get_latest_aqi, get_aqi_history, create_aqi
from app.models.aqi import AQIResponse

router = APIRouter(
    prefix="/aqi",
    tags=["AQI"]
)

@router.get("/latest", response_model=AQIResponse)
async def latest_aqi():
    return await get_latest_aqi()


@router.get("/history", response_model=list[AQIResponse])
async def history(limit: int = 50):
    return await get_aqi_history(limit=limit)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_aqi_endpoint(payload: AQIResponse):
    """Insert a new AQI record.

    Accepts an `AQIResponse` body, calls the async service `create_aqi`,
    and returns a JSON object containing a message and the inserted id.
    """
    try:
        inserted_id = await create_aqi(payload)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))

    return {"message": "AQI data inserted successfully", "id": inserted_id}