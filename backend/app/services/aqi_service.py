from app.models.aqi import AQIResponse


def get_latest_aqi():
    return AQIResponse(
        city="Hyderabad",
        aqi=126,
        pm25=54,
        pm10=78,
        temperature=31,
        humidity=63,
        timestamp="2026-07-15T10:00:00"
    )