from pydantic import BaseModel


class AQIResponse(BaseModel):
    city: str
    aqi: float
    pm25: float
    pm10: float
    co: float
    no2: float
    so2: float
    o3: float
    nh3: float
    temperature: float
    humidity: float
    timestamp: str