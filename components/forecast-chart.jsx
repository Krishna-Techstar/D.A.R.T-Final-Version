"use client"

import { useEffect, useRef } from "react"

export default function ForecastChart() {
  const canvasRef = useRef(null)

  const forecastData = [
    { day: "Sunday", aqi: 142 },
    { day: "Monday", aqi: 128 },
    { day: "Tuesday", aqi: 135 },
    { day: "Wednesday", aqi: 118 },
    { day: "Thursday", aqi: 156 },
    { day: "Friday", aqi: 132 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate points
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - 60

    const minAqi = Math.min(...forecastData.map((d) => d.aqi)) - 20
    const maxAqi = Math.max(...forecastData.map((d) => d.aqi)) + 20

    const points = forecastData.map((d, i) => ({
      x: padding + (i / (forecastData.length - 1)) * chartWidth,
      y: chartHeight - ((d.aqi - minAqi) / (maxAqi - minAqi)) * (chartHeight - 40) + 20,
      ...d,
    }))

    // Draw smooth curve
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpx = (prev.x + curr.x) / 2
      ctx.quadraticCurveTo(prev.x + (cpx - prev.x) * 0.8, prev.y, cpx, (prev.y + curr.y) / 2)
      ctx.quadraticCurveTo(cpx + (curr.x - cpx) * 0.2, curr.y, curr.x, curr.y)
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw glow
    ctx.shadowColor = "rgba(56, 189, 248, 0.5)"
    ctx.shadowBlur = 10
    ctx.stroke()
    ctx.shadowBlur = 0

    // Draw highlight point (Wednesday - index 3)
    const highlightIndex = 3
    const highlightPoint = points[highlightIndex]

    // Vertical dashed line
    ctx.beginPath()
    ctx.setLineDash([4, 4])
    ctx.moveTo(highlightPoint.x, highlightPoint.y)
    ctx.lineTo(highlightPoint.x, chartHeight + 20)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.setLineDash([])

    // Highlight dot with glow
    ctx.beginPath()
    ctx.arc(highlightPoint.x, highlightPoint.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
    ctx.shadowBlur = 15
    ctx.fill()
    ctx.shadowBlur = 0
  }, [])

  return (
    <div className="w-full">
      {/* Days Labels */}
      <div className="flex justify-between px-10 mb-4">
        {forecastData.map((d, i) => (
          <span key={d.day} className={`text-sm ${i === 3 ? "text-white font-medium" : "text-white/50"}`}>
            {d.day}
          </span>
        ))}
      </div>

      {/* Chart Canvas */}
      <div className="relative h-32">
        <canvas ref={canvasRef} width={800} height={150} className="w-full h-full" />
      </div>

      {/* AQI Values */}
      <div className="flex justify-between px-10 mt-2">
        {forecastData.map((d, i) => (
          <span
            key={`val-${d.day}`}
            className={`text-2xl font-light ${
              i === 3 ? "text-amber-400" : i === 4 ? "text-orange-400/80" : "text-white/60"
            }`}
          >
            {Math.round(d.aqi || 0)}
          </span>
        ))}
      </div>
    </div>
  )
}
