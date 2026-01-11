"use client"

import { useState } from "react"
import { ChevronRight, MessageSquare, Home, MapPin, BarChart3, Heart, Settings, Users, Calendar, LogIn, DollarSign, Activity } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"
import GlobeVisualization from "./globe-visualization"

export default function Sidebar() {
  const [aqiPercent] = useState(62)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const getAqiStatus = (percent) => {
    if (percent <= 20) return { label: "Good", color: "#22C55E" }
    if (percent <= 40) return { label: "Moderate", color: "#FACC15" }
    if (percent <= 60) return { label: "Unhealthy (SG)", color: "#FB923C" }
    if (percent <= 80) return { label: "Unhealthy", color: "#EF4444" }
    return { label: "Hazardous", color: "#7C2D12" }
  }

  const status = getAqiStatus(aqiPercent)

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/sensors", icon: Activity, label: "Sensor Data" },
    { href: "/community", icon: Users, label: "Community" },
    { href: "/community/events", icon: Calendar, label: "Volunteer Events" },
    { href: "/map", icon: MapPin, label: "Map" },
    { href: "/statistics", icon: BarChart3, label: "Statistics" },
    { href: "/health", icon: Heart, label: "Health" },
    { href: "/business-model", icon: DollarSign, label: "Business Model" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-64 glass-panel rounded-3xl p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-6">
        <Link href="/">
          <h1 className="text-xl font-semibold glass-text tracking-tight">D.A.R.T</h1>
          <p className="text-xs glass-text-muted mt-0.5">Dust Analysis & Removal Technology</p>
        </Link>
      </div>

      <nav className="mb-6">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isSubPage = item.href.includes("/community/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isSubPage ? "ml-4" : ""} ${
                  isActive
                    ? "bg-[var(--glass-card-bg)] glass-text"
                    : "glass-text-muted hover:bg-[var(--glass-card-bg)] hover:glass-text"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-[var(--glass-accent)]" : ""}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Status Section */}
      <div className="mb-6">
        <span className="text-xs glass-text-muted uppercase tracking-wider">Status</span>

        {/* AQI Gauge Card */}
        <div className="glass-card mt-3 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--glass-accent)] text-sm">↑</span>
              <span className="glass-text text-sm font-medium">{aqiPercent}%</span>
            </div>
            <MessageSquare className="w-4 h-4 glass-text-muted" />
          </div>

          {/* Gauge Visualization */}
          <div className="relative h-16 mb-4">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="var(--glass-border)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${aqiPercent * 2.5} 250`}
              />
              <circle
                cx={20 + (aqiPercent / 100) * 160}
                cy={90 - Math.sin((aqiPercent / 100) * Math.PI) * 80}
                r="6"
                fill="var(--glass-text)"
                stroke={status.color}
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Status Label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${status.color}20`,
              color: status.color,
              border: `1px solid ${status.color}40`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
            {status.label}
          </div>
        </div>

        <Link
          href="/statistics"
          className="flex items-center gap-1 glass-text-muted text-sm mt-4 hover:glass-text transition-colors"
        >
          See More Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Select Area Section */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs glass-text-muted uppercase tracking-wider">Select Area</span>
          <div className="flex gap-1">
            <Link
              href="/map"
              className="p-1.5 rounded-md bg-[var(--glass-card-bg)] hover:brightness-110 transition-all"
            >
              <svg className="w-3 h-3 text-[var(--glass-accent)]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--glass-text-muted)]" />
              <span className="w-1.5 h-1.5 rounded-full glass-text" />
            </div>
          </div>
        </div>

        <GlobeVisualization />

        <div className="glass-card mt-4 py-2.5 px-4 rounded-full text-center">
          <span className="glass-text-muted text-sm">Kharghar, Navi Mumbai, India</span>
        </div>
      </div>

      {/* Auth Section */}
      {!isAuthenticated && (
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link
            href="/auth/signin"
            className="glass-button w-full py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Sign In</span>
          </Link>
        </div>
      )}
    </div>
  )
}
