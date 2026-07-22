from pydantic import BaseModel


class AQIResponse(BaseModel):
    city: str
    aqi: float
    pm25: float
    pm10: float
    temperature: float
    humidity: float
    timestamp: str