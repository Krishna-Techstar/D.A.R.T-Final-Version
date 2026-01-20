"use client"

import { useState, useEffect } from "react"
import api from "@/lib/api"
import { Search, Download, MapPin, Wind, Droplets, Thermometer, LogIn, LogOut, User } from "lucide-react"
import Sidebar from "./sidebar"
import AqiDisplay from "./aqi-display"
import ForecastChart from "./forecast-chart"
import RecentLocations from "./recent-locations"
import ThemeToggle from "./theme-toggle"
import { useTheme } from "./theme-provider"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useWebSocket } from "@/hooks/use-websocket"

export default function AirQualityDashboard() {
  const { theme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [currentAqi, setCurrentAqi] = useState(156)
  const [location] = useState("Kharghar, Navi Mumbai, India")
  const [date] = useState(new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }))
  const [sensorData, setSensorData] = useState(null)
  const [error, setError] = useState(null)

  // WebSocket connection for real-time data
  const { isConnected, sensorData: wsSensorData, error: wsError } = useWebSocket(process.env.NEXT_PUBLIC_WS_URL)

  // Update sensor data from WebSocket
  useEffect(() => {
    if (wsSensorData && wsSensorData.length > 0) {
      const sensor = wsSensorData[0]; // Use first sensor for main display
      setSensorData(sensor);
      // Use AQI from sensor if available, otherwise calculate
      const aqi = sensor.aqi ? Math.round(sensor.aqi) : Math.round(sensor.pm25 * 2);
      setCurrentAqi(aqi);
      setError(null);
    }
  }, [wsSensorData]);

  // Fallback to REST API if WebSocket fails
  useEffect(() => {
    if (!isConnected && !sensorData) {
      const fetchSensorData = async () => {
        try {
          const res = await api.get('/sensors');
          if (res.data.success && res.data.data.length > 0) {
            const sensor = res.data.data[0];
            setSensorData(sensor);
            const aqi = sensor.aqi ? Math.round(sensor.aqi) : Math.round(sensor.pm25 * 2);
            setCurrentAqi(aqi);
          }
        } catch (err) {
          console.error("Failed to fetch sensor data", err);
          setError("Failed to connect to backend");
        }
      };
      fetchSensorData();
    }
  }, [isConnected, sensorData]);

  // Update error state from WebSocket
  useEffect(() => {
    if (wsError) {
      setError(wsError);
    }
  }, [wsError]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Connection Status Indicator */}
      <div className="absolute top-4 right-4 z-50">
         {error ? (
           <div className="bg-red-500/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
             🔴 {error}
           </div>
         ) : isConnected && sensorData ? (
           <div className="bg-green-500/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md flex items-center gap-2">
             <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
             🟢 Live Data (WebSocket)
           </div>
         ) : sensorData ? (
           <div className="bg-blue-500/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
             🔵 REST API
           </div>
         ) : (
           <div className="bg-yellow-500/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
             🟡 Connecting...
           </div>
         )}
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 z-0"
        style={{
          backgroundImage:
            theme === "dark"
              ? `url('/dramatic-stormy-sky-with-dark-clouds-and-amber-sun.jpg')`
              : `url('/bright-sunny-sky-with-soft-white-clouds-and-golden.jpg')`,
        }}
      />

      {/* Background Overlay */}
      <div
        className={`absolute inset-0 transition-colors duration-500 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-amber-900/30"
            : "bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-700/50"
        }`}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content - responsive layout: stack sidebar above content on small screens */}
      <div className="relative z-10 flex flex-col min-h-screen p-4 gap-4 md:p-6 md:gap-6 lg:flex-row">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Content */}
        <div className="flex-1 flex flex-col">
          {/* Header - responsive: stack location and actions on small screens */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className={`flex items-center gap-2 ${theme === "dark" ? "text-white/90" : "text-white/90"}`}>
              <MapPin className={`w-4 h-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-300"}`} />
              <span className="text-sm font-medium text-white">{location}</span>
              <span className="text-white/50 text-sm ml-2">( {date} )</span>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="glass-button p-2.5 rounded-full">
                <Search className="w-4 h-4 text-white/80" />
              </button>
              <button className="glass-button px-4 py-2.5 rounded-full flex items-center gap-2">
                <Download className="w-4 h-4 text-white/80" />
                <span className="text-sm font-medium text-white">Download App</span>
              </button>
              
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-white font-medium">{user?.name || "User"}</span>
                      <span className="text-xs text-white/50">{user?.email || ""}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="glass-button px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 text-white/80" />
                    <span className="text-sm font-medium text-white hidden md:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="glass-button px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                >
                  <LogIn className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-medium text-white">Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Main AQI Display - responsive: stack main and side panels vertically on small screens */}
          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex-1">
              <AqiDisplay aqi={currentAqi} />

              {/* Weather Description */}
              <div className="mt-8">
                <h1 className="text-5xl md:text-6xl font-light text-white/80 leading-tight">Unhealthy</h1>
                <h2 className="text-5xl md:text-6xl font-light text-white/60">for Sensitive Groups</h2>
              </div>

              {/* Forecast Chart */}
              <div className="mt-auto pt-12">
                <ForecastChart />
              </div>
            </div>

            {/* Right Panel - responsive: full width on small screens, fixed width on desktop */}
            <div className="w-full lg:w-96 flex flex-col gap-6 lg:ml-8 mt-8 lg:mt-0">
              {/* Description Card */}
              <div className="glass-card p-5 rounded-2xl">
                <p className="text-white/70 text-sm leading-relaxed">
                  With real time data and advanced technology, we provide reliable air quality forecasts for Navi Mumbai and surrounding areas including Kharghar, Belapur, Seawoods, Nerul, and more.
                </p>
              </div>

              {/* Recently Searched */}
              <RecentLocations />

              {/* Pollutant Cards */}
              <div className="grid grid-cols-3 gap-4 mt-auto">
                <div className="glass-card p-3 rounded-xl text-center">
                  <Wind className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <span className="text-xs text-white/50 block">PM2.5</span>
                  <span className="text-lg font-semibold text-white">
                    {sensorData ? Number(sensorData.pm25).toFixed(2) : 78}
                  </span>
                </div>
                <div className="glass-card p-3 rounded-xl text-center">
                  <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <span className="text-xs text-white/50 block">PM10</span>
                  <span className="text-lg font-semibold text-white">
                    {sensorData ? Number(sensorData.pm10).toFixed(2) : 124}
                  </span>
                </div>
                <div className="glass-card p-3 rounded-xl text-center">
                  <Thermometer className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <span className="text-xs text-white/50 block">Temp</span>
                  <span className="text-lg font-semibold text-white">32°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
