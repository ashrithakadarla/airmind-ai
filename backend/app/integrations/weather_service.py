import os
import requests
from dotenv import load_dotenv
import logging
from app.integrations.geocoding import get_coordinates

# Load environment variables
load_dotenv()
logger = logging.getLogger(__name__)

API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY is missing from the .env file.")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

from typing import Optional

def get_weather_data(city: str) -> Optional[dict]:
    """
    Fetch current weather data from OpenWeather API.
    """
    location = get_coordinates(city)

    if location is None:
        return None

    lat = location["lat"]
    lon = location["lon"]
    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(
            BASE_URL,
            params=params,
            timeout=10,
        )
        response.raise_for_status()

        data = response.json()

        weather = {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "pressure": data["main"]["pressure"],
            "wind_speed": data["wind"]["speed"],
            "wind_direction": data["wind"].get("deg"),
            "rain": data.get("rain", {}).get("1h", 0),
            "timestamp": data["dt"]
        }

        return weather

    except requests.exceptions.RequestException as e:
        
        logger.exception("Failed to fetch weather data")
        return None


# Run this file directly for testing
if __name__ == "__main__":
    weather = get_weather_data("Hyderabad")
    print(weather)