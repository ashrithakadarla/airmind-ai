import AQICard from '../components/AQICard/AQICard'
import AQIForecastChart from '../components/Charts/AQIForecastChart'
import ForecastCard from '../components/ForecastCard/ForecastCard'
import Footer from '../components/Footer/Footer'
import HealthRecommendation from '../components/HealthRecommendation/HealthRecommendation'
import SearchBar from '../components/SearchBar/SearchBar'
import { useEffect, useState } from "react";
import { getPrediction } from "../services/api";
import { getAQICategory } from "../utils/aqi";
import { useCity } from "../context/CityContext";
import './Prediction.css'

function Prediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { selectedCity, setSelectedCity } = useCity();
  
  useEffect(() => {
    async function loadPrediction() {
      setLoading(true);
      
      try {
        const data = await getPrediction(selectedCity);
        setPrediction(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPrediction();
  }, [selectedCity]);
  if (loading) return <h2>Loading prediction...</h2>;
  if (!prediction) return <h2>Prediction unavailable.</h2>;

  const liveAQI = Math.round(prediction.live_aqi);

  const predictedAQI = Math.round(prediction.current_aqi);

  const difference = predictedAQI - liveAQI;

  const insight =
    difference > 0
      ? `AI predicts AQI may increase by ${difference} points compared to the current live AQI.`
      : difference < 0
      ? `AI predicts AQI may decrease by ${Math.abs(
          difference
        )} points compared to the current live AQI.`
      : "AI predicts the AQI will remain stable.";

  const cityName = prediction.city;

  const forecast24 = Math.round(prediction.forecast_24_aqi);

  const forecast72 = Math.round(prediction.forecast_72_aqi);

  const recommendation = prediction.health_recommendation;

  const forecastData = [
    {
      label: "Now",
      aqi: predictedAQI,
    },
    {
      label: "24 Hours",
      aqi: forecast24,
    },
    {
      label: "72 Hours",
      aqi: forecast72,
    },
  ];

  return (
    <div className="prediction-page">
      <section className="prediction-hero">
        <h1 className="prediction-hero__title">AI Air Quality Prediction</h1>
        <p className="prediction-hero__subtitle">
          Search for a city and view AI-powered air quality forecasts.
        </p>
      </section>

      <section className="prediction-search">
        <SearchBar
          onSearch={(city) => {
            setSelectedCity(city);
          }}
        />
      </section>

      <section className="prediction-dashboard">
        <div className="prediction-dashboard__row prediction-dashboard__row--two">
          <AQICard
              title="Live AQI"
              city={cityName}
              aqi={liveAQI}
              category={getAQICategory(liveAQI)}
          />

          <AQICard
              title="AI Predicted AQI"
              city={cityName}
              aqi={predictedAQI}
              category={getAQICategory(predictedAQI)}
          />
        </div>

        <div className="prediction-insight">
          <p>{insight}</p>
        </div>

        <div className="prediction-dashboard__row prediction-dashboard__row--two">
          <ForecastCard
              label="24 Hour"
              aqi={forecast24}
              category={getAQICategory(forecast24)}
          />
          <ForecastCard
              label="72 Hour"
              aqi={forecast72}
              category={getAQICategory(forecast72)}
          />
        </div>

        <div className="prediction-dashboard__row prediction-dashboard__row--single">
          <div className="prediction-dashboard__chart">
            <AQIForecastChart data={forecastData} />
          </div>
        </div>

        <div className="prediction-dashboard__row prediction-dashboard__row--single">
          <HealthRecommendation text={recommendation} />
        </div>
      </section>

    </div>
  )
}

export default Prediction
