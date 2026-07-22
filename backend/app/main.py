import app.utils.path_setup

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.aqi import router as aqi_router
from app.api.prediction import router as prediction_router
from app.api import environment

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aqi_router)
app.include_router(prediction_router)
app.include_router(environment.router)


@app.get("/")
def root():
    return {"message": "AirMind AI Backend Running"}