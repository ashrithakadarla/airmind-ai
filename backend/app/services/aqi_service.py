from app.models.aqi import AQIResponse
from app.repositories.aqi_repository import (
    get_latest_aqi as repo_get_latest_aqi,
    get_aqi_history as repo_get_aqi_history,
    insert_aqi,
)

async def create_aqi(data: AQIResponse):
    return await insert_aqi(data.model_dump())

async def get_latest_aqi():
    data = await repo_get_latest_aqi()

    if not data:
        return None

    return AQIResponse(
        city=data["city"],
        aqi=data["aqi"],
        pm25=data["pm25"],
        pm10=data["pm10"],
        temperature=data["temperature"],
        humidity=data["humidity"],
        timestamp=data["timestamp"]
    )

async def get_aqi_history(limit: int = 50):
    records = await repo_get_aqi_history(limit=limit)

    if not records:
        return []

    return [
        AQIResponse(
            city=r["city"],
            aqi=r["aqi"],
            pm25=r["pm25"],
            pm10=r["pm10"],
            temperature=r["temperature"],
            humidity=r["humidity"],
            timestamp=r["timestamp"],
        )
        for r in records
    ]