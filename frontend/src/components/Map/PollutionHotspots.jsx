import { CircleMarker, Popup } from 'react-leaflet'
import './AQIMap.css'

function PollutionHotspots({ hotspots = [] }) {
  const getColor = (aqi) => {
    if (aqi >= 151) return '#d93025'
    if (aqi >= 101) return '#f39c12'
    if (aqi >= 76) return '#f1c40f'
    return '#2e8b57'
  }

  return (
    <>
      {hotspots.map((spot) => {
        const radius = Math.max(8, Math.min(22, 8 + Math.round(spot.aqi / 20)))
        return (
          <CircleMarker
            key={spot.name}
            center={spot.coordinates}
            radius={radius}
            pathOptions={{ color: getColor(spot.aqi), fillColor: getColor(spot.aqi), fillOpacity: 0.8 }}
          >
            <Popup>
              <div className="aqi-map-popup">
                <strong>{spot.name}</strong>
                <br />
                AQI: {spot.aqi}
                <br />
                Category: {spot.category}
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </>
  )
}

export default PollutionHotspots
