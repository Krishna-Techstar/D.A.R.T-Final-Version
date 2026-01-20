"use client"

import { useState, useEffect } from "react"
import { Activity, Thermometer, Droplets, Gauge, Navigation, MapPin, Clock, Wind, Cloud } from "lucide-react"
import PageLayout from "@/components/page-layout"
import api from "@/lib/api"
import { useWebSocket } from "@/hooks/use-websocket"

export default function SensorsPage() {
  const [sensors, setSensors] = useState([])
  const [selectedSensor, setSelectedSensor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // WebSocket connection for real-time data
  const { isConnected, sensorData: wsSensorData } = useWebSocket("process.env.NEXT_PUBLIC_WS_URL")

  // Fetch sensors from API
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoading(true)
        const res = await api.get('/sensors')
        if (res.data.success && res.data.data.length > 0) {
          setSensors(res.data.data)
          if (!selectedSensor) {
            setSelectedSensor(res.data.data[0])
          }
          setError(null)
        }
      } catch (err) {
        console.error("Failed to fetch sensors", err)
        setError("Failed to load sensor data")
      } finally {
        setLoading(false)
      }
    }
    fetchSensors()
  }, [])

  // Update sensors from WebSocket
  useEffect(() => {
    if (wsSensorData && wsSensorData.length > 0) {
      setSensors(wsSensorData)
      if (selectedSensor) {
        const updated = wsSensorData.find(s => s.sensorId === selectedSensor.sensorId)
        if (updated) setSelectedSensor(updated)
      }
    }
  }, [wsSensorData])

  // Update selected sensor when sensors change
  useEffect(() => {
    if (selectedSensor && sensors.length > 0) {
      const updated = sensors.find(s => s.sensorId === selectedSensor.sensorId)
      if (updated) setSelectedSensor(updated)
    }
  }, [sensors])

  const formatTime = (date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const sensor = selectedSensor || sensors[0]

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col gap-6">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-light glass-text">Sensor Module Data</h1>
            <p className="glass-text-muted text-xs sm:text-sm mt-1">Real-time sensor readings and environmental data</p>
          </div>
          {isConnected && (
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs self-start sm:self-auto">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live Data
            </div>
          )}
        </div>

        {/* Sensor Selector */}
        {sensors.length > 0 && (
          <div className="glass-card rounded-2xl p-4">
            <label className="text-sm glass-text-muted mb-2 block">Select Sensor</label>
            <select
              value={selectedSensor?.sensorId || sensors[0]?.sensorId || ""}
              onChange={(e) => {
                const sensor = sensors.find(s => s.sensorId === e.target.value)
                setSelectedSensor(sensor)
              }}
              className="w-full glass-button px-4 py-2 rounded-xl glass-text"
            >
              {sensors.map((s) => (
                <option key={s.sensorId} value={s.sensorId}>
                  {s.sensorId} - {s.name || s.location?.address || `${s.lat}, ${s.lng}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="glass-text-muted">Loading sensor data...</div>
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-red-400">{error}</div>
          </div>
        ) : sensor ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Particulate Matter Section */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-light glass-text mb-6 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-[var(--glass-accent)]" />
                Particulate Matter
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <DataCard
                  label="PM1.0"
                  value={Math.round(sensor.pm1 || 0)}
                  unit="µg/m³"
                  icon={Activity}
                  color="#60A5FA"
                />
                <DataCard
                  label="PM2.5"
                  value={Math.round(sensor.pm25 || 0)}
                  unit="µg/m³"
                  icon={Activity}
                  color="#3B82F6"
                />
                <DataCard
                  label="PM10"
                  value={Math.round(sensor.pm10 || 0)}
                  unit="µg/m³"
                  icon={Activity}
                  color="#2563EB"
                />
              </div>
            </div>

            {/* Gas Sensors Section */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-light glass-text mb-6 flex items-center gap-2">
                <Wind className="w-5 h-5 text-[var(--glass-accent)]" />
                Gas Sensors (Air Quality)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <DataCard
                  label="O₃ (Ozone)"
                  value={Math.round(sensor.o3 || 0)}
                  unit="ppb"
                  icon={Wind}
                  color="#10B981"
                />
                <DataCard
                  label="NO₂ (Nitrogen Dioxide)"
                  value={Math.round(sensor.no2 || 0)}
                  unit="ppb"
                  icon={Wind}
                  color="#F59E0B"
                />
                <DataCard
                  label="SO₂ (Sulfur Dioxide)"
                  value={Math.round(sensor.so2 || 0)}
                  unit="ppb"
                  icon={Wind}
                  color="#EF4444"
                />
                <DataCard
                  label="CO (Carbon Monoxide)"
                  value={(sensor.co || 0).toFixed(2)}
                  unit="ppm"
                  icon={Wind}
                  color="#8B5CF6"
                />
              </div>
            </div>

            {/* BME280 Section */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-light glass-text mb-6 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-[var(--glass-accent)]" />
                BME280 Environmental Sensor
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <DataCard
                  label="Temperature"
                  value={Math.round(sensor.temperature || 0)}
                  unit="°C"
                  icon={Thermometer}
                  color="#EF4444"
                />
                <DataCard
                  label="Pressure"
                  value={Math.round(sensor.pressure || 1013.25)}
                  unit="hPa"
                  icon={Gauge}
                  color="#6366F1"
                />
                <DataCard
                  label="Humidity"
                  value={Math.round(sensor.humidity || 0)}
                  unit="%"
                  icon={Droplets}
                  color="#3B82F6"
                />
              </div>
            </div>

            {/* Location & Navigation Section */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-light glass-text mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--glass-accent)]" />
                Location & Navigation
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <DataCard
                  label="Latitude"
                  value={(sensor.lat || 0).toFixed(6)}
                  unit="°"
                  icon={Navigation}
                  color="#22C55E"
                />
                <DataCard
                  label="Longitude"
                  value={(sensor.lng || 0).toFixed(6)}
                  unit="°"
                  icon={Navigation}
                  color="#22C55E"
                />
                <DataCard
                  label="Altitude"
                  value={Math.round(sensor.altitude || 0)}
                  unit="m"
                  icon={Navigation}
                  color="#10B981"
                />
                <DataCard
                  label="Speed"
                  value={(sensor.speed || 0).toFixed(2)}
                  unit="km/h"
                  icon={Navigation}
                  color="#14B8A6"
                />
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6">
              <h2 className="text-xl font-light glass-text mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--glass-accent)]" />
                Sensor Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <div className="text-xs glass-text-muted mb-1">Sensor ID</div>
                  <div className="text-base sm:text-lg glass-text font-medium">{sensor.sensorId}</div>
                </div>
                <div>
                  <div className="text-xs glass-text-muted mb-1">Location</div>
                  <div className="text-base sm:text-lg glass-text font-medium">
                    {sensor.location?.address || `${sensor.lat}, ${sensor.lng}`}
                  </div>
                  {sensor.location?.city && (
                    <div className="text-xs sm:text-sm glass-text-muted">{sensor.location.city}, {sensor.location.state}</div>
                  )}
                </div>
                <div>
                  <div className="text-xs glass-text-muted mb-1">Last Reading Time</div>
                  <div className="text-base sm:text-lg glass-text font-medium">{formatTime(sensor.lastReading)}</div>
                </div>
                <div>
                  <div className="text-xs glass-text-muted mb-1">Status</div>
                  <div className={`text-base sm:text-lg font-medium ${
                    sensor.status === 'active' ? 'text-green-400' :
                    sensor.status === 'maintenance' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {sensor.status?.toUpperCase() || 'UNKNOWN'}
                  </div>
                </div>
                <div>
                  <div className="text-xs glass-text-muted mb-1">AQI</div>
                  <div className="text-base sm:text-lg glass-text font-medium">{Math.round(sensor.aqi || 0)}</div>
                </div>
                <div>
                  <div className="text-xs glass-text-muted mb-1">Updated At</div>
                  <div className="text-base sm:text-lg glass-text font-medium">{formatTime(sensor.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="glass-text-muted">No sensor data available</div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

function DataCard({ label, value, unit, icon: Icon, color }) {
  return (
    <div className="glass-card rounded-xl p-3 sm:p-4 border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs glass-text-muted">{label}</div>
        {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-light glass-text">{value}</span>
        <span className="text-xs sm:text-sm glass-text-muted">{unit}</span>
      </div>
    </div>
  )
}
