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

  const currentAQI = Math.round(prediction.current_aqi);

  const category = prediction.aqi_category;

  const cityName = prediction.city;

  const forecast24 = Math.round(prediction.forecast_24_aqi);

  const forecast72 = Math.round(prediction.forecast_72_aqi);

  const recommendation = prediction.health_recommendation;

  const forecastData = [
      {
          label: "Current",
          aqi: currentAQI,
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
        <div className="prediction-dashboard__row prediction-dashboard__row--single">
          <AQICard city={cityName} aqi={currentAQI} category={category} />
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
