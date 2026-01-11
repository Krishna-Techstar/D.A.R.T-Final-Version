"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { useTheme } from "./theme-provider"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

// Component to handle map updates
function MapUpdater({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  return null
}

// Custom marker icon based on AQI status
function createCustomIcon(status, aqi) {
  const getStatusColor = (status) => {
    switch (status) {
      case "good": return "#22C55E"
      case "moderate": return "#FACC15"
      case "unhealthy-sensitive": return "#FB923C"
      case "unhealthy": return "#EF4444"
      case "very-unhealthy": return "#A855F7"
      case "hazardous": return "#7C2D12"
      default: return "#FACC15"
    }
  }

  const color = getStatusColor(status)
  
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 0 20px ${color}60;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        ${aqi}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

export default function LeafletMap({ locations = [], onLocationClick }) {
  const { theme } = useTheme()
  const mapRef = useRef(null)

  // Calculate center and bounds
  const center = locations.length > 0 
    ? [locations[0].lat, locations[0].lng]
    : [19.0312, 73.0656] // Default: Kharghar center

  // Dark/light tile layer
  const tileLayerUrl = theme === "dark"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const tileLayerAttribution = theme === "dark"
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        className="rounded-3xl"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution={tileLayerAttribution}
          url={tileLayerUrl}
        />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.status, location.aqi)}
            eventHandlers={{
              click: () => {
                if (onLocationClick) {
                  onLocationClick(location)
                }
              },
            }}
          >
            <Popup>
              <div style={{ padding: "8px", minWidth: "150px" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold" }}>
                  {location.name}
                </h3>
                <p style={{ margin: "4px 0", fontSize: "24px", fontWeight: "bold", color: getStatusColor(location.status) }}>
                  AQI: {Math.round(location.aqi || 0)}
                </p>
                <p style={{ margin: "4px 0", fontSize: "12px", textTransform: "capitalize" }}>
                  Status: {location.status.replace("-", " ")}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Fit bounds to show all markers */}
        {locations.length > 1 && (
          <MapUpdater
            center={[
              locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
              locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length,
            ]}
            zoom={11}
          />
        )}
      </MapContainer>
    </div>
  )
}

function getStatusColor(status) {
  switch (status) {
    case "good": return "#22C55E"
    case "moderate": return "#FACC15"
    case "unhealthy-sensitive": return "#FB923C"
    case "unhealthy": return "#EF4444"
    case "very-unhealthy": return "#A855F7"
    case "hazardous": return "#7C2D12"
    default: return "#FACC15"
  }
}
