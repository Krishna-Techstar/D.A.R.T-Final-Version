"use client"

import { Cloud, CloudRain } from "lucide-react"

export default function RecentLocations() {
  const locations = [
    { city: "Belapur CBD", aqi: 98, status: "Moderate", icon: Cloud },
    { city: "Seawoods", aqi: 85, status: "Moderate", icon: CloudRain },
    { city: "Vashi", aqi: 140, status: "Unhealthy", icon: Cloud },
  ]

  const getStatusColor = (aqi) => {
    if (aqi <= 50) return "#22C55E"
    if (aqi <= 100) return "#FACC15"
    if (aqi <= 150) return "#FB923C"
    return "#EF4444"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-white/50">Recently Searched</span>
        <button className="text-xs text-white/60 hover:text-white flex items-center gap-1">
          See All
          <span>›</span>
        </button>
      </div>

      <div className="flex gap-3">
        {locations.map((loc) => (
          <div
            key={loc.city}
            className="glass-card flex-1 p-4 rounded-2xl hover:bg-white/15 transition-colors cursor-pointer"
          >
            <loc.icon className="w-6 h-6 text-white/60 mb-3" />
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-semibold" style={{ color: getStatusColor(loc.aqi) }}>
                {Math.round(loc.aqi || 0)}
              </span>
              <span className="text-xs text-white/40">AQI</span>
            </div>
            <p className="text-xs text-white/80 font-medium">{loc.city}</p>
            <p className="text-xs text-white/40">{loc.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
