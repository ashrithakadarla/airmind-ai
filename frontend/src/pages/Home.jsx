import AQICard from '../components/AQICard/AQICard'
import AQIHistoryChart from '../components/Charts/AQIHistoryChart'
import PollutantPieChart from '../components/Charts/PollutionPieChart'
import PollutantTrendChart from '../components/Charts/PollutantTrendChart'
import Footer from '../components/Footer/Footer'
import AQIMap from '../components/Map/AQIMap'
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

  const pollutantPieData = pollutants.map((pollutant) => ({
    name: pollutant.name,
    value: pollutant.value,
  }))

  const hotspotData = [
    { name: 'Industrial Area', aqi: 165, category: 'Very Poor', coordinates: [17.41, 78.41] },
    { name: 'City Center', aqi: 120, category: 'Poor', coordinates: [17.39, 78.49] },
    { name: 'Residential Area', aqi: 75, category: 'Moderate', coordinates: [17.35, 78.45] },
    { name: 'City Park', aqi: 42, category: 'Good', coordinates: [17.43, 78.35] },
  ]

  return (
    <div className="home-page">
      <section className="home-hero">
        <h1 className="home-hero__title">Urban Air Quality Intelligence</h1>
        <p className="home-hero__subtitle">
          Monitor real-time air quality, weather conditions, pollutant levels, and AI-powered forecasts for smarter environmental decisions.
        </p>
        <a className="home-hero__cta" href="/prediction">
          View Predictions
        </a>
      </section>

      <section className="home-dashboard" aria-label="Air quality dashboard overview">
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
            <article className="home-dashboard__panel">
              <div className="home-dashboard__panel-header">
                <h2 className="home-dashboard__panel-title">AQI History</h2>
              </div>
              <AQIHistoryChart data={chartHistory} />
            </article>
          </div>
        </div>

        <div className="home-dashboard__row home-dashboard__row--single">
          <div className="home-dashboard__chart">
            <article className="home-dashboard__panel">
              <div className="home-dashboard__panel-header">
                <h2 className="home-dashboard__panel-title">Pollutant Trends</h2>
              </div>
              <PollutantTrendChart data={pollutantTrendData} />
            </article>
          </div>
        </div>

        <div className="home-dashboard__row home-dashboard__row--single">
          <div className="home-dashboard__chart">
            <article className="home-dashboard__panel">
              <div className="home-dashboard__panel-header">
                <h2 className="home-dashboard__panel-title">Pollutant Composition</h2>
              </div>
              <PollutantPieChart data={pollutantPieData} />
            </article>
          </div>
        </div>

        <div className="home-dashboard__row home-dashboard__row--single">
          <div className="home-dashboard__chart">
            <article className="home-dashboard__panel home-dashboard__panel--map">
              <div className="home-dashboard__panel-header">
                <h2 className="home-dashboard__panel-title">Interactive Air Quality Map</h2>
              </div>
              <AQIMap
                city={city}
                aqi={currentAQI}
                category={category}
                coordinates={[17.3850, 78.4867]}
                hotspots={hotspotData}
              />
            </article>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
