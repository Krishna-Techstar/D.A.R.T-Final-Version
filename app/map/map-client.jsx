"use client"

import { useState, useEffect } from "react"
import { Search, Layers, ZoomIn, ZoomOut, Navigation } from "lucide-react"
import PageLayout from "@/components/page-layout"
import dynamic from "next/dynamic"

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center glass-card rounded-3xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="glass-text-muted">Loading map...</p>
      </div>
    </div>
  ),
})

// Navi Mumbai area locations with exact coordinates
const locations = [
  { id: 1, name: "Kharghar Sector 12", aqi: 156, lat: 19.0312, lng: 73.0656, status: "unhealthy" },
  { id: 2, name: "MIDC Mahape", aqi: 165, lat: 19.1178, lng: 73.0189, status: "unhealthy" },
  { id: 3, name: "MIDC Taloja", aqi: 170, lat: 19.0956, lng: 73.0934, status: "unhealthy" },
  { id: 4, name: "Belapur CBD", aqi: 98, lat: 19.0162, lng: 73.0423, status: "moderate" },
  { id: 5, name: "Seawoods Darave", aqi: 85, lat: 19.0198, lng: 73.0556, status: "moderate" },
  { id: 6, name: "Nerul Sector 19", aqi: 112, lat: 19.0423, lng: 73.0823, status: "unhealthy-sensitive" },
  { id: 7, name: "Juinagar", aqi: 105, lat: 19.0589, lng: 73.0523, status: "unhealthy-sensitive" },
  { id: 8, name: "Sanpada", aqi: 102, lat: 19.0723, lng: 73.0223, status: "unhealthy-sensitive" },
  { id: 9, name: "Vashi Sector 17", aqi: 140, lat: 19.0812, lng: 72.9989, status: "unhealthy" },
  { id: 10, name: "Kharghar Station", aqi: 148, lat: 19.0278, lng: 73.0612, status: "unhealthy" },
]

const getStatusColor = (status) => {
  switch (status) {
    case "good":
      return "#22C55E"
    case "moderate":
      return "#FACC15"
    case "unhealthy-sensitive":
      return "#FB923C"
    case "unhealthy":
      return "#EF4444"
    case "very-unhealthy":
      return "#A855F7"
    case "hazardous":
      return "#7C2D12"
    default:
      return "#FACC15"
  }
}

export default function MapClient() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLocations = locations.filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
  }

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Map Area */}
        <div className="flex-1 glass-panel rounded-3xl overflow-hidden relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
          <LeafletMap locations={locations} onLocationClick={handleLocationClick} />
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 glass-card p-4 rounded-2xl z-[1000]">
            <h4 className="glass-text-muted text-xs uppercase tracking-wider mb-3">AQI Legend</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Good (0-50)", color: "#22C55E" },
                { label: "Moderate (51-100)", color: "#FACC15" },
                { label: "Unhealthy SG (101-150)", color: "#FB923C" },
                { label: "Unhealthy (151-200)", color: "#EF4444" },
                { label: "Hazardous (300+)", color: "#7C2D12" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="glass-text-muted text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-4 order-first lg:order-last">
          {/* Search */}
          <div className="glass-card rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          {/* Locations List */}
          <div className="glass-panel rounded-3xl p-4 flex-1 overflow-auto">
            <h3 className="text-white/70 text-xs uppercase tracking-wider mb-4">Nearby Locations</h3>
            <div className="flex flex-col gap-2">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`glass-card p-4 rounded-xl text-left transition-all ${
                    selectedLocation.id === loc.id ? "border-cyan-400/50 bg-white/15" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium text-sm">{loc.name}</h4>
                      <span className="text-white/50 text-xs capitalize">{loc.status.replace("-", " ")}</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: getStatusColor(loc.status) }}>
                      {loc.aqi}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Location Details */}
          {selectedLocation && (
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-3">{selectedLocation.name}</h3>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold" style={{ color: getStatusColor(selectedLocation.status) }}>
                  {selectedLocation.aqi}
                </div>
                <div className="flex-1">
                  <div className="text-white/50 text-xs uppercase mb-1">Status</div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${getStatusColor(selectedLocation.status)}20`,
                      color: getStatusColor(selectedLocation.status),
                    }}
                  >
                    {selectedLocation.status.replace("-", " ")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
