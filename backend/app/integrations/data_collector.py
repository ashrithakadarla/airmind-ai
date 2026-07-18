"""Async collector for environmental data stored in MongoDB."""

from __future__ import annotations

import logging
import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from app.integrations.openweather_aqi import get_aqi_data
from app.integrations.weather_service import get_weather_data

logger = logging.getLogger(__name__)


def _get_location_metadata() -> Dict[str, Any]:
    """Build the location metadata payload from environment variables."""
    lat = os.getenv("LAT", "").strip()
    lon = os.getenv("LON", "").strip()
    city = os.getenv("CITY", "Unknown").strip() or "Unknown"

    try:
        latitude = float(lat) if lat else None
    except ValueError:
        latitude = None

    try:
        longitude = float(lon) if lon else None
    except ValueError:
        longitude = None

    return {
        "city": city,
        "latitude": latitude,
        "longitude": longitude,
    }


def collect_environmental_data() -> Dict[str, Any]:
    """
    Fetch, clean, standardize and merge
    weather and AQI data.

    Returns a standardized environmental
    data document.
    """
    logger.info("Starting environmental data collection")

    weather_data = get_weather_data()
    aqi_data = get_aqi_data()

    if weather_data is None or aqi_data is None:
        logger.warning("Failed to fetch environmental data from upstream services")
        return {
            "success": False,
            "message": "Failed to fetch environmental data.",
        }

    try:
        document = {
            **_get_location_metadata(),

            "weather": weather_data,

            "air_quality": aqi_data,

            "collected_at": datetime.now(timezone.utc).isoformat(),
        }

        return {
            "success": True,
            "message": "Environmental data collected successfully.",
            "data": document,
        }
    except Exception as exc:  # pragma: no cover - defensive logging path
        logger.exception("Failed to store environmental data: %s", exc)
        return {
            "success": False,
            "message": "Failed to store environmental data.",
        }
if __name__ == "__main__":
    result = collect_environmental_data()
    print(result)