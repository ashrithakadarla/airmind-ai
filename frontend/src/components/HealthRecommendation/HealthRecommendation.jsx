import { FaHeartbeat } from 'react-icons/fa'
import './HealthRecommendation.css'

function HealthRecommendation({ text }) {
  return (
    <article className="health-card">
      <div className="health-card__icon" aria-hidden="true">
        <FaHeartbeat />
      </div>
      <p className="health-card__text">{text}</p>
    </article>
  )
}

export default HealthRecommendation
