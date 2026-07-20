import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import './Charts.css'

function PollutionPieChart({ data = [] }) {
  const colors = ['#0f4c81', '#2f7dbb', '#3e9bd8', '#68b0e0', '#8cc7eb', '#b4dcf3']

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Pollutant Composition</h3>
      <div className="chart-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              animationDuration={900}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PollutionPieChart
