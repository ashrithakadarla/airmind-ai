import app.utils.path_setup

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.api.aqi import router as aqi_router
from app.api.prediction import router as prediction_router

from app.database.mongodb import (
    connect_to_mongodb,
    close_mongodb_connection,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongodb()
    yield
    await close_mongodb_connection()


app = FastAPI(
    title="AirMind AI",
    lifespan=lifespan
)

app.include_router(aqi_router)
app.include_router(prediction_router)


@app.get("/")
def root():
    return {"message": "AirMind AI Backend Running"}