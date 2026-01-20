"use client"

import { useState } from "react"
import {
  Upload,
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Users,
  Calendar,
  Building2,
} from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  { id: "garbage", label: "Garbage Burning" },
  { id: "dust", label: "Dust Pollution" },
  { id: "industrial", label: "Industrial Smoke" },
  { id: "vehicle", label: "Vehicle Emissions" },
]

const MOCK_COMPLAINTS = [
  {
    id: 1,
    description:
      "Heavy smoke from illegal garbage burning near Kharghar Sector 20 residential area. Affecting multiple blocks and causing respiratory issues for residents.",
    location: "Kharghar Sector 20, Navi Mumbai",
    timestamp: "2 hours ago",
    verifications: 87,
    required: 100,
    status: "near",
    category: "garbage",
    image: "/smoke-from-garbage-burning-in-urban-area.jpg",
  },
  {
    id: 2,
    description:
      "Construction site in MIDC Taloja releasing excessive dust without proper containment measures. Visible dust clouds affecting nearby residential areas.",
    location: "MIDC Taloja, Navi Mumbai",
    timestamp: "5 hours ago",
    verifications: 100,
    required: 100,
    status: "verified",
    category: "dust",
    image: "/construction-dust-pollution-urban-site.jpg",
    event: {
      ngo: "Clean Air Initiative",
      date: "January 15, 2026",
      location: "Kharghar Sector 20 Community Center",
    },
  },
  {
    id: 3,
    description:
      "Industrial facility in MIDC Mahape releasing dark smoke during night hours. Strong chemical smell reported by multiple residents in surrounding areas.",
    location: "MIDC Mahape, Navi Mumbai",
    timestamp: "1 day ago",
    verifications: 42,
    required: 100,
    status: "review",
    category: "industrial",
    image: "/industrial-smoke-pollution-factory-at-night.jpg",
  },
]

export default function CommunityDashboard() {
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("kharghar")
  const [dragActive, setDragActive] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState([
    { title: "MIDC Taloja Cleanup", date: "Jan 15", location: "Kharghar Community Center" },
    { title: "Air Quality Workshop", date: "Jan 18", location: "Belapur Library" },
  ])

  const locationNames = {
    "kharghar": "Kharghar, Navi Mumbai",
    "midc-mahape": "MIDC Mahape, Navi Mumbai",
    "midc-taloja": "MIDC Taloja, Navi Mumbai",
    "belapur": "Belapur CBD, Navi Mumbai",
    "seawoods": "Seawoods Darave, Navi Mumbai",
    "nerul": "Nerul Sector 19, Navi Mumbai",
    "juinagar": "Juinagar, Navi Mumbai",
    "sanpada": "Sanpada, Navi Mumbai",
    "vashi": "Vashi Sector 17, Navi Mumbai"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim()) return
    
    // Create new complaint
    const newComplaint = {
      id: Math.max(...complaints.map(c => c.id)) + 1,
      description: description,
      location: locationNames[location] || locationNames["kharghar"],
      timestamp: "Just now",
      verifications: 1,
      required: 100,
      status: "review",
      category: selectedCategory || "garbage",
      image: "/placeholder.svg"
    }
    
    setComplaints([newComplaint, ...complaints])
    
    // If category suggests an event should be created, add it
    if (selectedCategory && (selectedCategory === "dust" || selectedCategory === "garbage" || selectedCategory === "industrial")) {
      const today = new Date()
      const eventDate = new Date(today)
      eventDate.setDate(today.getDate() + 7)
      
      const categoryLabels = {
        "dust": "Dust Cleanup",
        "garbage": "Garbage Cleanup",
        "industrial": "Industrial Survey"
      }
      
      const newEvent = {
        title: `${categoryLabels[selectedCategory]} - ${locationNames[location].split(",")[0]}`,
        date: eventDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        location: locationNames[location].split(",")[0] + " Community Center"
      }
      
      setUpcomingEvents([newEvent, ...upcomingEvents])
    }
    
    // Reset form
    setDescription("")
    setSelectedCategory("")
    setLocation("kharghar")
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "verified":
        return {
          label: "Verified",
          icon: CheckCircle2,
          color: "#22c55e",
          bg: "rgba(34, 197, 94, 0.15)",
          glow: "verified-glow",
        }
      case "near":
        return {
          label: "Near Verification",
          icon: AlertTriangle,
          color: "#f59e0b",
          bg: "rgba(245, 158, 11, 0.15)",
          glow: "verification-glow",
        }
      default:
        return {
          label: "Under Review",
          icon: Clock,
          color: "var(--glass-text-muted)",
          bg: "var(--glass-card-bg)",
          glow: "",
        }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Left Column - Submission Form & Feed */}
      <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
        {/* Complaint Submission Card */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold glass-text mb-1">Report a Pollution Issue</h2>
            <p className="glass-text-muted text-sm">Help your community by reporting verified problems</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Description */}
            <div>
              <label className="block text-sm glass-text-muted mb-2">Issue Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the pollution issue you observed..."
                rows={4}
                className="w-full bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-2xl px-4 py-3 glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm glass-text-muted mb-2">Upload Evidence</label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive
                    ? "border-[var(--glass-accent)] bg-[var(--glass-accent)]/10"
                    : "border-[var(--glass-card-border)] hover:border-[var(--glass-accent)]/50"
                }`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => setDragActive(false)}
              >
                <Upload className="w-8 h-8 mx-auto mb-3 glass-text-muted" />
                <p className="glass-text text-sm mb-1">Drag and drop images here</p>
                <p className="glass-text-muted text-xs">or click to browse</p>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm glass-text-muted mb-2">Category (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[var(--glass-accent)] text-slate-900"
                        : "glass-card glass-text-muted hover:glass-text"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm glass-text-muted mb-2">Location</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <MapPin className="w-5 h-5 text-[var(--glass-accent)]" />
                </div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-2xl glass-text focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] appearance-none cursor-pointer"
                >
                  <option value="kharghar">Kharghar, Navi Mumbai</option>
                  <option value="midc-mahape">MIDC Mahape, Navi Mumbai</option>
                  <option value="midc-taloja">MIDC Taloja, Navi Mumbai</option>
                  <option value="belapur">Belapur CBD, Navi Mumbai</option>
                  <option value="seawoods">Seawoods Darave, Navi Mumbai</option>
                  <option value="nerul">Nerul Sector 19, Navi Mumbai</option>
                  <option value="juinagar">Juinagar, Navi Mumbai</option>
                  <option value="sanpada">Sanpada, Navi Mumbai</option>
                  <option value="vashi">Vashi Sector 17, Navi Mumbai</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 glass-text-muted pointer-events-none rotate-90" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-2xl bg-[var(--glass-accent)] text-slate-900 font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--glass-accent)]/25"
            >
              Submit Report
            </button>
          </form>
        </div>

        {/* Complaint Feed */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold glass-text">Community Reports</h3>
            <span className="glass-text-muted text-sm">{complaints.length} active reports</span>
          </div>

          {complaints.map((complaint, index) => {
            const statusConfig = getStatusConfig(complaint.status)
            const StatusIcon = statusConfig.icon
            const progress = (complaint.verifications / complaint.required) * 100

            return (
              <div
                key={complaint.id}
                className={`glass-panel rounded-3xl p-5 animate-fade-in ${statusConfig.glow}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={complaint.image || "/placeholder.svg"}
                      alt="Report evidence"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="glass-text text-sm leading-relaxed line-clamp-2 mb-2">{complaint.description}</p>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {/* Location Pill */}
                      <span className="glass-card px-3 py-1 rounded-full text-xs glass-text-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {complaint.location}
                      </span>

                      {/* Timestamp */}
                      <span className="glass-text-muted text-xs">{complaint.timestamp}</span>
                    </div>

                    {/* Verification Progress */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-[var(--glass-card-bg)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 animate-progress"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: statusConfig.color,
                          }}
                        />
                      </div>
                      <span className="glass-text text-xs font-medium whitespace-nowrap">
                        {complaint.verifications} / {complaint.required}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex flex-col items-end gap-2">
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.color,
                      }}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig.label}
                    </div>

                    {complaint.status !== "verified" && (
                      <button className="glass-button px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 hover:brightness-110">
                        <Users className="w-3.5 h-3.5" />
                        Verify
                      </button>
                    )}
                  </div>
                </div>

                {/* Event Card for Verified Complaints */}
                {complaint.status === "verified" && complaint.event && (
                  <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                    <div className="glass-card rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 text-xs font-medium">Verified by Community</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className="glass-text text-sm font-medium">{complaint.event.ngo}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Calendar className="w-3 h-3 glass-text-muted" />
                              <span className="glass-text-muted text-xs">{complaint.event.date}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/community/events"
                          className="glass-button px-4 py-2 rounded-full text-xs font-medium hover:brightness-110"
                        >
                          Volunteer for Event
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Column - Verification & Action Status */}
      <div className="flex flex-col gap-4 sm:gap-6 order-first lg:order-last">
        {/* Verification Progress Panel */}
        <div className="glass-panel rounded-3xl p-6 sticky top-6">
          <h3 className="text-lg font-semibold glass-text mb-1">Community Verification Status</h3>
          <p className="glass-text-muted text-sm mb-6">
            Once verified, issues are escalated to partner NGOs for action
          </p>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold glass-text">12</p>
              <p className="glass-text-muted text-xs mt-1">Active Reports</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-green-500">8</p>
              <p className="glass-text-muted text-xs mt-1">Verified This Week</p>
            </div>
          </div>

          {/* Verification Flow */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--glass-accent)]/20 flex items-center justify-center text-[var(--glass-accent)] text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="glass-text text-sm font-medium">Report Submitted</p>
                <p className="glass-text-muted text-xs">Community member files report</p>
              </div>
            </div>
            <div className="w-px h-4 bg-[var(--glass-border)] ml-4" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="glass-text text-sm font-medium">Community Verification</p>
                <p className="glass-text-muted text-xs">100 verifications required</p>
              </div>
            </div>
            <div className="w-px h-4 bg-[var(--glass-border)] ml-4" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="glass-text text-sm font-medium">NGO Action</p>
                <p className="glass-text-muted text-xs">Event organized for resolution</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partner NGOs */}
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-lg font-semibold glass-text mb-4">Partner Organizations</h3>

          <div className="flex flex-col gap-3">
            {[
              { name: "Clean Air Initiative", events: 24 },
              { name: "Green Navi Mumbai Coalition", events: 18 },
              { name: "Navi Mumbai Environmental Watch", events: 31 },
            ].map((org) => (
              <div key={org.name} className="glass-card rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--glass-accent)]/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[var(--glass-accent)]" />
                </div>
                <div className="flex-1">
                  <p className="glass-text text-sm font-medium">{org.name}</p>
                  <p className="glass-text-muted text-xs">{org.events} events completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold glass-text">Upcoming Events</h3>
            <Link
              href="/community/events"
              className="glass-text-muted text-xs hover:glass-text transition-colors flex items-center gap-1"
            >
              See All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {upcomingEvents.map((event, i) => (
              <Link
                key={i}
                href="/community/events"
                className="glass-card rounded-xl p-3 hover:brightness-110 transition-all"
              >
                <p className="glass-text text-sm font-medium">{event.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="glass-text-muted text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                  <span className="glass-text-muted text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/community/events"
            className="mt-4 w-full py-3 rounded-xl bg-[var(--glass-accent)] text-slate-900 font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--glass-accent)]/25 flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            Browse All Events
          </Link>
        </div>
      </div>
    </div>
  )
}
