import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import PollutionHotspots from './PollutionHotspots'
import './AQIMap.css'

const defaultIcon = L.divIcon({
  className: 'aqi-map-icon',
  html: '<div class="aqi-map-marker"></div>',
  iconSize: [18, 18],
})

function AQIMap({
  city = 'Hyderabad',
  aqi = 78,
  category = 'Moderate',
  coordinates = [17.3850, 78.4867],
  hotspots = [],
}) {
  const cityName = city || 'Hyderabad'
  const aqiValue = Number(aqi) || 78
  const categoryName = category || 'Moderate'

  return (
    <div className="aqi-map-card">
      <div className="aqi-map-card__header">
        <div>
          <p className="aqi-map-card__eyebrow">Air Quality Map</p>
          <h3 className="aqi-map-card__title">AQI Overview</h3>
        </div>
        <span className="aqi-map-card__badge">{cityName}</span>
      </div>

      <div className="aqi-map-card__summary">
        <span>City: {cityName}</span>
        <span>AQI: {aqiValue}</span>
        <span>Category: {categoryName}</span>
      </div>

      <div className="aqi-map-card__map">
        <MapContainer
          className="aqi-map"
          center={coordinates}
          zoom={11}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates} icon={defaultIcon}>
            <Popup>
              <div className="aqi-map-popup">
                <strong>{cityName}</strong>
                <br />
                AQI: {aqiValue}
                <br />
                Category: {categoryName}
              </div>
            </Popup>
          </Marker>
          <PollutionHotspots hotspots={hotspots} />
        </MapContainer>
      </div>
    </div>
  )
}

export default AQIMap
