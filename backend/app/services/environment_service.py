from app.repositories.aqi_repository import get_latest_environment as repo_get_latest_environment

async def get_latest_environment(city: str):
    return await repo_get_latest_environment(city)