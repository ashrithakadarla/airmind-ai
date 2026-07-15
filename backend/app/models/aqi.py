from pydantic import BaseModel


class AQIResponse(BaseModel):
    city: str
    aqi: int
    pm25: int
    pm10: int
    temperature: int
    humidity: int
    timestamp: str