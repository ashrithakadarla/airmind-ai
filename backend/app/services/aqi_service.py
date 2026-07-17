import logging
from typing import Optional

from app.integrations.data_collector import collect_environmental_data
from app.models.aqi import AQIResponse
from app.repositories.aqi_repository import (
    get_latest_aqi as repo_get_latest_aqi,
    get_aqi_history as repo_get_aqi_history,
    insert_aqi,
)


logger = logging.getLogger(__name__)

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
    
async def collect_and_store_environmental_data() -> Optional[str]:
    """Collect standardized environmental data and store it in MongoDB.

    Returns:
        The inserted MongoDB document ID when collection succeeds, or ``None``
        if the upstream collection or database write fails.
    """

    # Collect the standardized environmental payload from the integration layer.
    try:
        data = collect_environmental_data()
    except Exception as exc:
        logger.exception("Environmental data collection failed: %s", exc)
        return None

    # Stop here when the collector reports a failure.
    if not data.get("success"):
        return None

    # Extract only the standardized document body that should be persisted.
    environmental_document = data.get("data", {})
    if not environmental_document:
        return None

    # Persist the full document and return the inserted MongoDB document ID.
    try:
        inserted_id = await insert_aqi(environmental_document)
    except Exception as exc:
        logger.exception("Failed to store environmental data in MongoDB: %s", exc)
        return None

    return str(inserted_id)