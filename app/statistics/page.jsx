"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Wind, Droplets, Cloud, Flame, Activity } from "lucide-react"
import PageLayout from "@/components/page-layout"

const pollutantData = [
  { name: "PM2.5", value: 78, unit: "µg/m³", max: 100, trend: "up", change: 12 },
  { name: "PM10", value: 124, unit: "µg/m³", max: 150, trend: "up", change: 8 },
  { name: "O₃", value: 45, unit: "ppb", max: 100, trend: "down", change: 5 },
  { name: "NO₂", value: 32, unit: "ppb", max: 100, trend: "down", change: 3 },
  { name: "SO₂", value: 18, unit: "ppb", max: 75, trend: "stable", change: 0 },
  { name: "CO", value: 1.2, unit: "ppm", max: 9, trend: "down", change: 0.3 },
]

const hourlyData = [
  { hour: "12AM", aqi: 142 },
  { hour: "3AM", aqi: 138 },
  { hour: "6AM", aqi: 145 },
  { hour: "9AM", aqi: 162 },
  { hour: "12PM", aqi: 156 },
  { hour: "3PM", aqi: 148 },
  { hour: "6PM", aqi: 158 },
  { hour: "9PM", aqi: 152 },
]

const weeklyData = [
  { day: "Mon", aqi: 98 },
  { day: "Tue", aqi: 112 },
  { day: "Wed", aqi: 135 },
  { day: "Thu", aqi: 142 },
  { day: "Fri", aqi: 156 },
  { day: "Sat", aqi: 128 },
  { day: "Sun", aqi: 118 },
]

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("24h")

  const getBarColor = (value, max) => {
    const percent = (value / max) * 100
    if (percent <= 33) return "#22C55E"
    if (percent <= 66) return "#FACC15"
    return "#EF4444"
  }

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col gap-6">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-light glass-text">ML Statistics & Analysis</h1>
            <p className="glass-text-muted text-xs sm:text-sm mt-1">AI-powered predictions and detailed pollutant analysis</p>
          </div>

          {/* Time Range Selector */}
          <div className="glass-card rounded-xl p-1 flex gap-1 flex-wrap">
            {["24h", "7d", "30d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  timeRange === range ? "bg-[var(--glass-accent)]/20 glass-text" : "glass-text-muted hover:glass-text"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Current AQI", value: "156", icon: Activity, color: "#EF4444" },
            { label: "24h Average", value: "148", icon: TrendingUp, color: "#FB923C" },
            { label: "Weekly Average", value: "127", icon: TrendingDown, color: "#FACC15" },
            { label: "Best Today", value: "98", icon: Wind, color: "#22C55E" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                <span className="glass-text-muted text-xs">{stat.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold glass-text">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Hourly Chart */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="glass-text text-sm font-semibold mb-2">Hourly AQI Trend</h3>
            <p className="glass-text-muted text-xs mb-6">Real-time monitoring data</p>
            <div className="flex items-end justify-between h-48 gap-2">
              {hourlyData.map((item, index) => {
                const maxAqi = Math.max(...hourlyData.map((d) => d.aqi))
                const height = (item.aqi / maxAqi) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <span className="glass-text-muted text-xs">{item.aqi}</span>
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{
                        height: `${height}%`,
                        backgroundColor: getBarColor(item.aqi, 200),
                      }}
                    />
                    <span className="glass-text-muted text-xs">{item.hour}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="glass-text text-sm font-semibold mb-2">Weekly Overview</h3>
            <p className="glass-text-muted text-xs mb-6">7-day historical analysis</p>
            <div className="flex items-end justify-between h-48 gap-4">
              {weeklyData.map((item, index) => {
                const maxAqi = Math.max(...weeklyData.map((d) => d.aqi))
                const height = (item.aqi / maxAqi) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <span className="glass-text-muted text-xs">{item.aqi}</span>
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{
                        height: `${height}%`,
                        backgroundColor: getBarColor(item.aqi, 200),
                      }}
                    />
                    <span className="glass-text-muted text-xs">{item.day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ML Predictions Section */}
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="glass-text text-lg font-semibold mb-2">AI Predictions (Next 7 Days)</h3>
          <p className="glass-text-muted text-sm mb-6">Machine learning forecast based on historical patterns</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
            {[
              { day: "Today", aqi: 156, trend: "stable" },
              { day: "Tomorrow", aqi: 142, trend: "down" },
              { day: "Day 3", aqi: 138, trend: "down" },
              { day: "Day 4", aqi: 145, trend: "up" },
              { day: "Day 5", aqi: 132, trend: "down" },
              { day: "Day 6", aqi: 128, trend: "down" },
              { day: "Day 7", aqi: 125, trend: "down" },
            ].map((pred, idx) => (
              <div key={idx} className="glass-card rounded-xl p-4 text-center">
                <div className="text-xs glass-text-muted mb-2">{pred.day}</div>
                <div className="text-2xl font-bold glass-text mb-1">{pred.aqi}</div>
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  pred.trend === "down" ? "text-green-500" : pred.trend === "up" ? "text-red-500" : "glass-text-muted"
                }`}>
                  {pred.trend === "down" ? <TrendingDown className="w-3 h-3" /> : 
                   pred.trend === "up" ? <TrendingUp className="w-3 h-3" /> : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pollutants Grid */}
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="glass-text text-lg font-semibold mb-6">Pollutant Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {pollutantData.map((pollutant) => (
              <div key={pollutant.name} className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${getBarColor(pollutant.value, pollutant.max)}20` }}
                    >
                      {pollutant.name.includes("PM") ? (
                        <Wind className="w-5 h-5" style={{ color: getBarColor(pollutant.value, pollutant.max) }} />
                      ) : pollutant.name === "O₃" ? (
                        <Cloud className="w-5 h-5" style={{ color: getBarColor(pollutant.value, pollutant.max) }} />
                      ) : pollutant.name === "CO" ? (
                        <Flame className="w-5 h-5" style={{ color: getBarColor(pollutant.value, pollutant.max) }} />
                      ) : (
                        <Droplets className="w-5 h-5" style={{ color: getBarColor(pollutant.value, pollutant.max) }} />
                      )}
                    </div>
                    <div>
                      <h4 className="glass-text font-semibold">{pollutant.name}</h4>
                      <span className="glass-text-muted text-xs">{pollutant.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {pollutant.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : pollutant.trend === "down" ? (
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    ) : null}
                    <span
                      className={`text-xs ${
                        pollutant.trend === "up"
                          ? "text-red-400"
                          : pollutant.trend === "down"
                            ? "text-green-400"
                            : "text-white/40"
                      }`}
                    >
                      {pollutant.trend === "stable" ? "—" : `${pollutant.change}${pollutant.unit}`}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-[var(--glass-card-bg)] rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-all"
                    style={{
                      width: `${(pollutant.value / pollutant.max) * 100}%`,
                      backgroundColor: getBarColor(pollutant.value, pollutant.max),
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold" style={{ color: getBarColor(pollutant.value, pollutant.max) }}>
                    {pollutant.value}
                  </span>
                  <span className="glass-text-muted text-xs">/ {pollutant.max}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
