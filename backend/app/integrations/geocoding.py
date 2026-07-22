import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

GEOCODE_URL = "http://api.openweathermap.org/geo/1.0/direct"


def get_coordinates(city: str):
    response = requests.get(
        GEOCODE_URL,
        params={
            "q": city,
            "limit": 1,
            "appid": API_KEY,
        },
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    if not data:
        return None

    return {
        "city": data[0]["name"],
        "lat": data[0]["lat"],
        "lon": data[0]["lon"],
    }