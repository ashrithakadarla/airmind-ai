"""FastAPI routes for AQI prediction APIs."""

from fastapi import APIRouter, HTTPException, status

from app.services.prediction_service import (
    PredictorError,
    get_complete_prediction,
    get_current_prediction,
    get_forecast_prediction,
)


router = APIRouter(
	prefix="/prediction",
	tags=["Prediction"],
)


@router.get("/all")
async def complete_prediction(city: str):
	"""Return current and forecast AQI predictions for a city."""

	# Keep the API layer thin and delegate all prediction work to the service.
	try:
		return await get_complete_prediction(city)
	except PredictorError as exc:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail=str(exc),
		)
	except Exception as exc:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=str(exc),
		)


@router.get("/current")
async def current_prediction(city: str):
	"""Return the current AQI prediction for a city."""

	# Keep the API layer thin and delegate all prediction work to the service.
	try:
		return await get_current_prediction(city)
	except PredictorError as exc:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail=str(exc),
		)
	except Exception as exc:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=str(exc),
		)


@router.get("/forecast")
async def forecast_prediction(city: str):
	"""Return the AQI forecast prediction for a city."""

	# Keep the API layer thin and delegate all prediction work to the service.
	try:
		return await get_forecast_prediction(city)
	except PredictorError as exc:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail=str(exc),
		)
	except Exception as exc:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=str(exc),
		)
