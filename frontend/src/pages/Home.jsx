import AQICard from '../components/AQICard/AQICard'
import AQIHistoryChart from '../components/Charts/AQIHistoryChart'
import PollutantPieChart from '../components/Charts/PollutionPieChart'
import PollutantTrendChart from '../components/Charts/PollutantTrendChart'
import AQIMap from '../components/Map/AQIMap'
import PollutantCard from '../components/PollutantCard/PollutantCard'
import WeatherCard from '../components/WeatherCard/WeatherCard'
import { useEffect, useState } from "react";
import { useCity } from "../context/CityContext";
import Loading from "../components/Loading/Loading";

import {
  getLatestAQI,
  getAQIHistory,
  getLatestEnvironment,
} from "../services/api";
import { getAQICategory } from "../utils/aqi";
import './Home.css'

function Home() {
  const { selectedCity } = useCity();
  
  const [dashboardData, setDashboardData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [environment, setEnvironment] = useState(null);
  const [aqiHistory, setAQIHistory] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [latest, history, environment] = await Promise.all([
            getLatestAQI(selectedCity),
            getAQIHistory(selectedCity),
            getLatestEnvironment(selectedCity),
        ]);

        setDashboardData(latest);
        setHistory(history);
        setEnvironment(environment);
        setAQIHistory(history);
      } catch (err) {
        console.error(err);
        return;
      } finally {
        setLoading(false);
      }
    }

    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 1800000); // every 5 minutes

    return () => clearInterval(interval);

  }, [selectedCity]);

  if (loading) {
    return (
      <Loading message="Analyzing live environmental conditions..." />
    );
  }
  if (!dashboardData) return <h2>Unable to load AQI data.</h2>;
  

  const currentAQI = dashboardData.aqi;

  const weather = {
      temperature: environment.weather.temperature,
      humidity: environment.weather.humidity,
      pressure: environment.weather.pressure,
      windSpeed: environment.weather.wind_speed,
  };


  const category = getAQICategory(currentAQI);
  
  const pollutants = [
    { name: "PM2.5", value: dashboardData.pm25 },
    { name: "PM10", value: dashboardData.pm10 },
    { name: "CO", value: dashboardData.co },
    { name: "NO₂", value: dashboardData.no2 },
    { name: "SO₂", value: dashboardData.so2 },
    { name: "O₃", value: dashboardData.o3 },
    { name: "NH₃", value: dashboardData.nh3 },
  ];
  const chartHistory = [...history]
    .reverse()
    .map(item => ({
        label: new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
        aqi: item.aqi,
    }));

  const pollutantTrendData = history
    .slice()
    .reverse()
    .map((item) => ({
      label: new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
      pm25: item.pm25,
      pm10: item.pm10,
    }));

  const pollutantPieData = pollutants.map((pollutant) => ({
    name: pollutant.name,
    value: pollutant.value,
  }))

  const hotspotData = environment
  ? [
      {
        name: `${selectedCity} Center`,
        aqi: currentAQI,
        category,
        coordinates: [
          environment.latitude,
          environment.longitude,
        ],
      },
      {
        name: "North Zone",
        aqi: currentAQI + 18,
        category: getAQICategory(currentAQI + 18),
        coordinates: [
          environment.latitude + 0.03,
          environment.longitude - 0.03,
        ],
      },
      {
        name: "South Zone",
        aqi: Math.max(currentAQI - 12, 1),
        category: getAQICategory(Math.max(currentAQI - 12, 1)),
        coordinates: [
          environment.latitude - 0.03,
          environment.longitude + 0.03,
        ],
      },
      {
        name: "East Zone",
        aqi: currentAQI + 7,
        category: getAQICategory(currentAQI + 7),
        coordinates: [
          environment.latitude,
          environment.longitude + 0.04,
        ],
      },
    ]
  : [];
  
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
          <AQICard city={selectedCity} aqi={currentAQI} category={category} />
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
                city={selectedCity}
                aqi={currentAQI}
                category={category}
                coordinates={
                  environment?.latitude && environment?.longitude
                    ? [environment.latitude, environment.longitude]
                    : [17.3850, 78.4867]
                }
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
