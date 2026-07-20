import AQICard from '../components/AQICard/AQICard'
import AQIForecastChart from '../components/Charts/AQIForecastChart'
import ForecastCard from '../components/ForecastCard/ForecastCard'
import Footer from '../components/Footer/Footer'
import HealthRecommendation from '../components/HealthRecommendation/HealthRecommendation'
import SearchBar from '../components/SearchBar/SearchBar'
import { dashboardData } from '../data/mockData.js'
import './Prediction.css'

function Prediction() {
  const { city, currentAQI, category, forecast24, forecast72, recommendation } = dashboardData

  const forecastData = [
    { label: 'Current', aqi: currentAQI },
    { label: '12 Hours', aqi: forecast24 - 2 },
    { label: '24 Hours', aqi: forecast24 },
    { label: '48 Hours', aqi: forecast24 + 3 },
    { label: '72 Hours', aqi: forecast72 },
  ]

  return (
    <div className="prediction-page">
      <section className="prediction-hero">
        <h1 className="prediction-hero__title">AI Air Quality Prediction</h1>
        <p className="prediction-hero__subtitle">
          Search for a city and view AI-powered air quality forecasts.
        </p>
      </section>

      <section className="prediction-search">
        <SearchBar />
      </section>

      <section className="prediction-dashboard">
        <div className="prediction-dashboard__row prediction-dashboard__row--single">
          <AQICard city={city} aqi={currentAQI} category={category} />
        </div>

        <div className="prediction-dashboard__row prediction-dashboard__row--two">
          <ForecastCard label="24 Hour" aqi={forecast24} category="Moderate" />
          <ForecastCard label="72 Hour" aqi={forecast72} category="Poor" />
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

      <Footer />
    </div>
  )
}

export default Prediction
