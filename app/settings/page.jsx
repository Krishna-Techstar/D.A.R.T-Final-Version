"use client"

import { useState } from "react"
import { Bell, Globe, Palette, Shield, Smartphone, ChevronRight, MapPin } from "lucide-react"
import PageLayout from "@/components/page-layout"

const settingsSections = [
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    settings: [
      { id: "push", label: "Push Notifications", description: "Get alerts on your device", type: "toggle" },
      { id: "email", label: "Email Alerts", description: "Receive daily summaries", type: "toggle" },
      {
        id: "threshold",
        label: "AQI Alert Threshold",
        description: "Get notified when AQI exceeds",
        type: "select",
        options: ["50", "100", "150", "200"],
      },
    ],
  },
  {
    id: "display",
    title: "Display",
    icon: Palette,
    settings: [
      {
        id: "theme",
        label: "Theme",
        description: "Choose your preferred theme",
        type: "select",
        options: ["Auto", "Light", "Dark"],
      },
      {
        id: "units",
        label: "Units",
        description: "Temperature & measurement units",
        type: "select",
        options: ["Metric", "Imperial"],
      },
      {
        id: "language",
        label: "Language",
        description: "App display language",
        type: "select",
        options: ["English", "Spanish", "French", "German"],
      },
    ],
  },
  {
    id: "location",
    title: "Location",
    icon: Globe,
    settings: [
      { id: "auto", label: "Auto-detect Location", description: "Use GPS for current location", type: "toggle" },
      { id: "default", label: "Default Location", description: "Set your home location", type: "text" },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    icon: Shield,
    settings: [
      { id: "analytics", label: "Usage Analytics", description: "Help improve the app", type: "toggle" },
      { id: "history", label: "Search History", description: "Save your searched locations", type: "toggle" },
    ],
  },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("notifications")
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    threshold: "100",
    theme: "Auto",
    units: "Metric",
    language: "English",
    auto: true,
    default: "Kharghar, Navi Mumbai, India",
    analytics: true,
    history: true,
  })

  const handleToggle = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSelect = (id, value) => {
    setSettings((prev) => ({ ...prev, [id]: value }))
  }

  const currentSection = settingsSections.find((s) => s.id === activeSection)

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light text-white">Settings</h1>
          <p className="text-white/50 text-sm mt-1">Customize your D.A.R.T experience</p>
        </div>

        {/* Settings Layout */}
        <div className="flex gap-6 flex-1">
          {/* Sections Navigation */}
          <div className="w-64">
            <div className="glass-panel rounded-3xl p-4">
              <nav className="flex flex-col gap-1">
                {settingsSections.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        isActive ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white/90"
                      }`}
                    >
                      <section.icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : ""}`} />
                      <span className="font-medium text-sm">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? "rotate-90" : ""}`} />
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* App Info */}
            <div className="glass-card rounded-2xl p-5 mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">D.A.R.T</h3>
                  <span className="text-white/40 text-xs">Version 2.4.1</span>
                </div>
              </div>
              <button className="w-full glass-button py-2.5 rounded-xl text-sm">Check for Updates</button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 glass-panel rounded-3xl p-6">
            {currentSection && (
              <>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <currentSection.icon className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-white">{currentSection.title}</h2>
                </div>

                <div className="flex flex-col gap-4">
                  {currentSection.settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <h4 className="text-white font-medium">{setting.label}</h4>
                        <p className="text-white/50 text-sm">{setting.description}</p>
                      </div>

                      {setting.type === "toggle" && (
                        <button
                          onClick={() => handleToggle(setting.id)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            settings[setting.id] ? "bg-cyan-500" : "bg-white/20"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              settings[setting.id] ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      )}

                      {setting.type === "select" && (
                        <div className="flex gap-2">
                          {setting.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleSelect(setting.id, option)}
                              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                settings[setting.id] === option
                                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                  : "bg-white/10 text-white/60 hover:text-white"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {setting.type === "text" && (
                        <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span className="text-white/80 text-sm">{settings[setting.id]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
