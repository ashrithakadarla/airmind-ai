import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './Charts.css'

function PollutantTrendChart({ data = [] }) {
  return (
    <div className="chart-card">
      <div className="chart-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#e6eef7" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: '#58708f', fontSize: 12 }} />
            <YAxis tick={{ fill: '#58708f', fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="pm25" name="PM2.5" fill="#0f4c81" animationDuration={900} />
            <Bar dataKey="pm10" name="PM10" fill="#2f7dbb" animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PollutantTrendChart
