"use client"

import { useState } from "react"
import { Heart, AlertTriangle, Shield, Activity, Users, Baby, Bike, Home, Search } from "lucide-react"
import PageLayout from "@/components/page-layout"
import AIHealthChat from "@/components/ai-health-chat"

const recommendations = [
  {
    id: 1,
    icon: Users,
    title: "General Population",
    level: "warning",
    advice: "Reduce prolonged outdoor exertion. Take more breaks during outdoor activities.",
    activities: ["Limit outdoor exercise", "Use air purifiers indoors", "Keep windows closed"],
  },
  {
    id: 2,
    icon: Heart,
    title: "Heart & Lung Conditions",
    level: "danger",
    advice: "Avoid all outdoor physical activities. Keep rescue medications accessible.",
    activities: ["Stay indoors", "Monitor symptoms closely", "Use air filtration"],
  },
  {
    id: 3,
    icon: Baby,
    title: "Children & Elderly",
    level: "danger",
    advice: "Avoid outdoor activities. Keep indoors with filtered air.",
    activities: ["Indoor activities only", "Ensure proper hydration", "Monitor for symptoms"],
  },
  {
    id: 4,
    icon: Bike,
    title: "Athletes & Active Adults",
    level: "warning",
    advice: "Move workouts indoors or reduce intensity. Avoid exercising near traffic.",
    activities: ["Indoor gym workouts", "Reduce workout duration", "Avoid peak hours"],
  },
]

const healthTips = [
  { icon: Home, tip: "Keep windows and doors closed to prevent outdoor air from entering." },
  { icon: Shield, tip: "Use HEPA air purifiers to clean indoor air effectively." },
  { icon: Activity, tip: "Monitor your symptoms and seek medical attention if they worsen." },
]

const getLevelColor = (level) => {
  switch (level) {
    case "good":
      return "#22C55E"
    case "moderate":
      return "#FACC15"
    case "warning":
      return "#FB923C"
    case "danger":
      return "#EF4444"
    default:
      return "#FACC15"
  }
}

export default function HealthPage() {
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const currentAqi = 156

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-light glass-text">Health Recommendations</h1>
            <p className="glass-text-muted text-sm mt-1">Personalized advice based on current air quality</p>
          </div>

          {/* Current AQI Badge */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="glass-text-muted text-xs uppercase block mb-1">Current AQI</span>
                <span className="text-4xl font-bold text-orange-400">{currentAqi}</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <span className="glass-text-muted text-xs uppercase block mb-1">Status</span>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm font-medium">Unhealthy for Sensitive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="glass-card rounded-2xl p-5 border-l-4 border-orange-500">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="glass-text font-semibold mb-1">Air Quality Alert</h3>
              <p className="glass-text-muted text-sm leading-relaxed">
                Air quality is currently unhealthy for sensitive groups. People with respiratory or heart conditions,
                the elderly, and children should limit prolonged outdoor exposure.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel rounded-3xl p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 glass-text-muted" />
            <input
              type="text"
              placeholder="Search health topics, symptoms, recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-card rounded-xl glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] text-sm"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6 flex-1">
          {/* Recommendations */}
          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="glass-text-muted text-xs uppercase tracking-wider">Group Recommendations</h2>

            <div className="grid grid-cols-2 gap-4">
              {recommendations
                .filter((rec) => 
                  !searchQuery || 
                  rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  rec.advice.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  rec.activities.some(act => act.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setSelectedGroup(selectedGroup === rec.id ? null : rec.id)}
                  className={`glass-card rounded-2xl p-5 text-left transition-all ${
                    selectedGroup === rec.id ? "border-cyan-400/50 bg-white/15" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getLevelColor(rec.level)}20` }}
                    >
                      <rec.icon className="w-6 h-6" style={{ color: getLevelColor(rec.level) }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="glass-text font-semibold">{rec.title}</h3>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLevelColor(rec.level) }} />
                      </div>
                      <p className="glass-text-muted text-sm leading-relaxed">{rec.advice}</p>

                      {selectedGroup === rec.id && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <span className="glass-text-muted text-xs uppercase">Suggested Actions</span>
                          <ul className="mt-2 space-y-2">
                            {rec.activities.map((activity, i) => (
                              <li key={i} className="flex items-center gap-2 glass-text-muted text-sm">
                                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Health Tips Sidebar */}
          <div className="flex flex-col gap-4">
            <h2 className="glass-text-muted text-xs uppercase tracking-wider">Quick Tips</h2>

            <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4">
              {healthTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="glass-text-muted text-sm leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>

            {/* AI Health Chat */}
            <div className="flex-1 min-h-[400px]">
              <AIHealthChat currentAqi={currentAqi} />
            </div>

            {/* Protection Level */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="glass-text-muted text-xs uppercase mb-4">Recommended Protection</h3>
              <div className="flex items-center gap-4">
                <Shield className="w-10 h-10 text-orange-400" />
                <div>
                  <span className="glass-text font-semibold block">N95 Mask</span>
                  <span className="glass-text-muted text-sm">For outdoor activities</span>
                </div>
              </div>
            </div>

            {/* Air Quality Forecast */}
            <div className="glass-card rounded-2xl p-5 mt-auto">
              <h3 className="glass-text-muted text-xs uppercase mb-4">Tomorrow Forecast</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-yellow-400">128</span>
                  <span className="glass-text-muted text-sm ml-2">AQI</span>
                </div>
                <div className="text-right">
                  <span className="text-yellow-400 text-sm font-medium block">Moderate</span>
                  <span className="glass-text-muted text-xs">Improvement expected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Blog Section */}
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-2xl font-semibold glass-text mb-6">Health & Wellness Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Understanding PM2.5 and Its Health Impacts",
                excerpt: "PM2.5 particles are so small they can penetrate deep into your lungs and bloodstream, causing serious health issues. Learn how to protect yourself.",
                category: "Air Quality",
                readTime: "5 min read",
                date: "Jan 15, 2026"
              },
              {
                title: "Air Quality in Navi Mumbai: A Comprehensive Guide",
                excerpt: "Navi Mumbai faces unique air quality challenges due to industrial zones and construction. Discover the hotspots and solutions.",
                category: "Local Impact",
                readTime: "8 min read",
                date: "Jan 12, 2026"
              },
              {
                title: "Indoor Air Quality: Making Your Home a Safe Haven",
                excerpt: "Your indoor air can be more polluted than outdoor air. Learn about effective air purification strategies and plants that help.",
                category: "Home Safety",
                readTime: "6 min read",
                date: "Jan 10, 2026"
              },
              {
                title: "The Link Between Air Pollution and Respiratory Diseases",
                excerpt: "Long-term exposure to poor air quality significantly increases the risk of asthma, COPD, and other respiratory conditions. Early prevention is key.",
                category: "Medical Research",
                readTime: "7 min read",
                date: "Jan 8, 2026"
              },
              {
                title: "Children and Air Pollution: Special Protection Guidelines",
                excerpt: "Children are more vulnerable to air pollution due to their developing lungs. Essential guidelines for parents in polluted areas.",
                category: "Family Health",
                readTime: "5 min read",
                date: "Jan 5, 2026"
              },
              {
                title: "Exercise and Air Quality: When to Work Out Safely",
                excerpt: "Timing your workouts based on air quality data can protect your health. Learn the best times to exercise in Navi Mumbai.",
                category: "Fitness",
                readTime: "4 min read",
                date: "Jan 3, 2026"
              },
              {
                title: "Government vs. Community Sensors: Understanding Data Accuracy",
                excerpt: "How D.A.R.T sensors compare to government monitoring stations and why community-based monitoring matters for your health decisions.",
                category: "Technology",
                readTime: "6 min read",
                date: "Jan 1, 2026"
              },
              {
                title: "Mask Selection Guide: N95, KN95, or Cloth Masks?",
                excerpt: "Not all masks are created equal. A comprehensive guide to choosing the right protection based on current air quality levels.",
                category: "Protection",
                readTime: "5 min read",
                date: "Dec 28, 2025"
              },
              {
                title: "Seasonal Air Quality Patterns in Navi Mumbai",
                excerpt: "Understanding how air quality changes throughout the year helps you prepare better. Winter inversions, monsoon improvements, and more.",
                category: "Climate",
                readTime: "7 min read",
                date: "Dec 25, 2025"
              }
            ].map((article, index) => (
              <div key={index} className="glass-card rounded-2xl p-5 hover:brightness-110 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--glass-accent)]/20 text-[var(--glass-accent)] font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs glass-text-muted">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold glass-text mb-2">{article.title}</h3>
                <p className="glass-text-muted text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)]">
                  <span className="text-xs glass-text-muted">{article.date}</span>
                  <button className="text-sm text-[var(--glass-accent)] font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
