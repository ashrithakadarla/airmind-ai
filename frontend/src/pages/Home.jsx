import AQICard from '../components/AQICard/AQICard'
import AQIHistoryChart from '../components/Charts/AQIHistoryChart'
import PollutantTrendChart from '../components/Charts/PollutantTrendChart'
import Footer from '../components/Footer/Footer'
import PollutantCard from '../components/PollutantCard/PollutantCard'
import WeatherCard from '../components/WeatherCard/WeatherCard'
import { dashboardData } from '../data/mockData.js'
import './Home.css'

function Home() {
  const { city, currentAQI, category, weather, pollutants } = dashboardData

  const chartHistory = [
    { label: 'Mon', aqi: 62 },
    { label: 'Tue', aqi: 70 },
    { label: 'Wed', aqi: 68 },
    { label: 'Thu', aqi: 74 },
    { label: 'Fri', aqi: 78 },
    { label: 'Sat', aqi: 72 },
    { label: 'Sun', aqi: 69 },
  ]

  const pollutantTrendData = [
    { label: 'Mon', pm25: 21, pm10: 38 },
    { label: 'Tue', pm25: 24, pm10: 41 },
    { label: 'Wed', pm25: 22, pm10: 39 },
    { label: 'Thu', pm25: 27, pm10: 45 },
    { label: 'Fri', pm25: 25, pm10: 42 },
    { label: 'Sat', pm25: 23, pm10: 40 },
    { label: 'Sun', pm25: 20, pm10: 36 },
  ]

  return (
    <div className="home-page">
      <section className="home-hero">
        <h1 className="home-hero__title">Urban Air Quality Intelligence</h1>
        <p className="home-hero__subtitle">
          Monitor real-time air quality, weather conditions, and AI-powered forecasts.
        </p>
        <a className="home-hero__cta" href="/prediction">
          View Predictions
        </a>
      </section>

      <section className="home-dashboard">
        <div className="home-dashboard__row home-dashboard__row--two">
          <AQICard city={city} aqi={currentAQI} category={category} />
          <WeatherCard
            temperature={weather.temperature}
            humidity={weather.humidity}
            pressure={weather.pressure}
            windSpeed={weather.windSpeed}
          />
        </div>

        <div className="home-dashboard__row home-dashboard__row--grid">
          {pollutants.map((pollutant) => (
            <PollutantCard key={pollutant.name} name={pollutant.name} value={pollutant.value} />
          ))}
        </div>

        <div className="home-dashboard__row home-dashboard__row--single">
          <div className="home-dashboard__chart">
            <AQIHistoryChart data={chartHistory} />
          </div>
        </div>

        <div className="home-dashboard__row home-dashboard__row--single">
          <div className="home-dashboard__chart">
            <PollutantTrendChart data={pollutantTrendData} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
