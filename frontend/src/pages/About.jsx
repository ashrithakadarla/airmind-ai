import {
  FaCloudSun,
  FaBrain,
  FaHeartbeat,
  FaChartLine,
  FaSearch,
  FaWind,
  FaThermometerHalf,
  FaShieldAlt,
  FaMobileAlt,
  FaSatelliteDish,
  FaTools,
  FaUsers,
} from 'react-icons/fa'
import { FiActivity, FiDatabase, FiCpu, FiMonitor, FiGlobe } from 'react-icons/fi'
import Footer from '../components/Footer/Footer'
import './About.css'

function About() {
  const overviewCards = [
    {
      title: 'Live AQI Monitoring',
      description: 'Track live air quality levels with a clear, actionable AQI view.',
      icon: <FiActivity />,
    },
    {
      title: 'Weather Monitoring',
      description: 'Understand environmental conditions through temperature, humidity, and wind insights.',
      icon: <FaCloudSun />,
    },
    {
      title: 'AI-based AQI Prediction',
      description: 'Use forecast models to anticipate future air conditions and potential risks.',
      icon: <FaBrain />,
    },
    {
      title: 'Health Recommendations',
      description: 'Receive actionable guidance that helps users make safer decisions.',
      icon: <FaHeartbeat />,
    },
    {
      title: 'Interactive Dashboard',
      description: 'Explore air quality information through intuitive, responsive visuals.',
      icon: <FaChartLine />,
    },
  ]

  const featureCards = [
    { title: 'Live Air Quality Monitoring', icon: <FiActivity /> },
    { title: 'Weather Monitoring', icon: <FaCloudSun /> },
    { title: 'AI Forecasting', icon: <FaBrain /> },
    { title: 'Historical AQI Trends', icon: <FaChartLine /> },
    { title: 'Pollutant Analysis', icon: <FaWind /> },
    { title: 'Health Advisory', icon: <FaHeartbeat /> },
    { title: 'Responsive Dashboard', icon: <FiMonitor /> },
    { title: 'Search by City', icon: <FaSearch /> },
  ]

  const techGroups = [
    {
      title: 'Frontend',
      items: ['React', 'React Router', 'Recharts', 'React Icons'],
    },
    {
      title: 'Backend',
      items: ['FastAPI'],
    },
    {
      title: 'Database',
      items: ['MongoDB'],
    },
    {
      title: 'Machine Learning',
      items: ['Python', 'Scikit-learn'],
    },
    {
      title: 'Deployment',
      items: ['Vercel', 'Render'],
    },
  ]

  const teamMembers = [
    { name: 'Ava', role: 'Data Collection & API Integration', initials: 'AV' },
    { name: 'Noah', role: 'Backend Development', initials: 'NO' },
    { name: 'Mina', role: 'Machine Learning & Prediction', initials: 'MI' },
    { name: 'Leo', role: 'Frontend Dashboard', initials: 'LE' },
  ]

  const enhancements = [
    'Real-time Alerts',
    'Mobile Application',
    'Multiple City Comparison',
    'IoT Sensor Integration',
    'Satellite Data Integration',
    'AI Health Risk Assessment',
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">About AirMind AI</p>
          <h1 className="about-hero__title">About AirMind AI</h1>
          <p className="about-hero__subtitle">
            AirMind AI is an intelligent air quality monitoring and forecasting platform that combines environmental data, weather information, and machine learning to provide meaningful air quality insights and health recommendations.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__header">
          <h2 className="about-section__title">Project Overview</h2>
          <p className="about-section__text">
            AirMind AI brings together monitoring, forecasting, and guidance in one modern experience.
          </p>
        </div>
        <div className="about-grid">
          {overviewCards.map((card) => (
            <article className="about-card" key={card.title}>
              <div className="about-card__icon">{card.icon}</div>
              <h3 className="about-card__title">{card.title}</h3>
              <p className="about-card__description">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__header">
          <h2 className="about-section__title">Features</h2>
          <p className="about-section__text">
            A feature-rich interface designed for clarity, speed, and insight.
          </p>
        </div>
        <div className="about-grid">
          {featureCards.map((feature) => (
            <article className="about-card" key={feature.title}>
              <div className="about-card__icon">{feature.icon}</div>
              <h3 className="about-card__title">{feature.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__header">
          <h2 className="about-section__title">Technology Stack</h2>
          <p className="about-section__text">
            Built with a modern stack for monitoring, analysis, and deployment.
          </p>
        </div>
        <div className="about-grid">
          {techGroups.map((group) => (
            <div className="about-tech-group" key={group.title}>
              <h3 className="about-tech-group__title">{group.title}</h3>
              <div className="about-tech-group__list">
                {group.items.map((item) => (
                  <span className="about-pill" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__header">
          <h2 className="about-section__title">Team</h2>
          <p className="about-section__text">
            A collaborative team building the next generation of urban air intelligence.
          </p>
        </div>
        <div className="about-grid">
          {teamMembers.map((member) => (
            <article className="about-team-card" key={member.name}>
              <div className="about-team-avatar">{member.initials}</div>
              <div className="about-team-meta">
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__header">
          <h2 className="about-section__title">Future Enhancements</h2>
          <p className="about-section__text">
            Planned upgrades to expand the platform’s reach and intelligence.
          </p>
        </div>
        <div className="about-grid">
          {enhancements.map((item) => (
            <article className="about-card" key={item}>
              <div className="about-card__icon"><FaTools /></div>
              <h3 className="about-card__title">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
