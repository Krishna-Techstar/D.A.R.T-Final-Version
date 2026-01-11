"use client"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  ChevronRight,
  Building2,
  Filter,
  Search,
  Heart,
  Share2,
  Award,
  Leaf,
  Wind,
  Trash2,
} from "lucide-react"

const MOCK_EVENTS = [
  {
    id: 1,
    title: "MIDC Taloja Community Cleanup",
    description:
      "Join us to clean up the construction site dust pollution reported by the community. Equipment and refreshments provided.",
    ngo: "Clean Air Initiative",
    date: "January 15, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Kharghar Sector 20 Community Center, Navi Mumbai",
    category: "dust",
    volunteers: { current: 42, needed: 50 },
      image: "/construction-dust-pollution-urban-site.jpg",
    impact: "2.5 tons waste removed",
    linkedReport: "MIDC Taloja Construction Dust Pollution",
  },
  {
    id: 2,
    title: "Air Quality Workshop",
    description:
      "Learn about air quality monitoring, how to read AQI data, and ways to protect yourself and your community from pollution.",
    ngo: "Navi Mumbai Environmental Watch",
    date: "January 18, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Belapur Public Library, Navi Mumbai",
    category: "education",
    volunteers: { current: 28, needed: 40 },
      image: "/bright-sunny-sky-with-soft-white-clouds-and-golden.jpg",
    impact: "200+ residents educated",
    linkedReport: null,
  },
  {
    id: 3,
    title: "MIDC Mahape Industrial Zone Survey",
    description:
      "Help us document and report industrial emissions in the MIDC Mahape area. Training provided for air quality monitoring equipment.",
    ngo: "Green Navi Mumbai Coalition",
    date: "January 22, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "MIDC Mahape Environmental Center, Navi Mumbai",
    category: "industrial",
    volunteers: { current: 15, needed: 25 },
      image: "/industrial-smoke-pollution-factory-at-night.jpg",
    impact: "3 factories flagged",
    linkedReport: "MIDC Mahape Industrial Smoke at Night",
  },
  {
    id: 4,
    title: "Tree Planting Day",
    description:
      "Help us plant 100 new trees in Kharghar to improve air quality and create natural barriers against pollution.",
    ngo: "Clean Air Initiative",
    date: "January 28, 2026",
    time: "8:00 AM - 12:00 PM",
    location: "Central Park, Kharghar, Navi Mumbai",
    category: "planting",
    volunteers: { current: 65, needed: 80 },
      image: "/bright-sunny-sky-with-soft-white-clouds-and-golden.jpg",
    impact: "100 trees planted",
    linkedReport: null,
  },
  {
    id: 5,
    title: "Garbage Burning Awareness Campaign",
    description:
      "Door-to-door campaign to educate residents about the dangers of garbage burning and proper waste disposal methods.",
    ngo: "Navi Mumbai Environmental Watch",
    date: "February 2, 2026",
    time: "11:00 AM - 4:00 PM",
    location: "Kharghar Community Hall, Navi Mumbai",
    category: "garbage",
    volunteers: { current: 18, needed: 30 },
      image: "/smoke-from-garbage-burning-in-urban-area.jpg",
    impact: "500+ homes reached",
    linkedReport: "Kharghar Garbage Burning Near Residential Area",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Events", icon: Calendar },
  { id: "dust", label: "Dust Cleanup", icon: Wind },
  { id: "garbage", label: "Garbage Issues", icon: Trash2 },
  { id: "industrial", label: "Industrial", icon: Building2 },
  { id: "planting", label: "Tree Planting", icon: Leaf },
  { id: "education", label: "Education", icon: Award },
]

const USER_STATS = {
  eventsJoined: 8,
  hoursVolunteered: 32,
  impactScore: 450,
  badges: ["First Event", "Team Player", "Eco Warrior"],
}

export default function EventsClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [registeredEvents, setRegisteredEvents] = useState([1])
  const [events, setEvents] = useState(MOCK_EVENTS)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    ngo: "",
    date: "",
    time: "",
    location: "",
    category: "dust"
  })

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRegister = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter((id) => id !== eventId))
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  const handleCreateEvent = (e) => {
    e.preventDefault()
    // Format date for display
    const dateObj = new Date(newEvent.date)
    const formattedDate = dateObj.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    const createdEvent = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      title: newEvent.title,
      description: newEvent.description,
      ngo: newEvent.ngo,
      date: formattedDate,
      time: newEvent.time,
      location: newEvent.location + ", Navi Mumbai",
      category: newEvent.category,
      volunteers: { current: 0, needed: 50 },
      image: newEvent.category === "dust" ? "/construction-dust-pollution-urban-site.jpg" :
             newEvent.category === "garbage" ? "/smoke-from-garbage-burning-in-urban-area.jpg" :
             newEvent.category === "industrial" ? "/industrial-smoke-pollution-factory-at-night.jpg" :
             newEvent.category === "planting" ? "/bright-sunny-sky-with-soft-white-clouds-and-golden.jpg" :
             "/placeholder.jpg",
      impact: "Event created",
      linkedReport: null
    }
    setEvents([createdEvent, ...events])
    setNewEvent({ title: "", description: "", ngo: "", date: "", time: "", location: "", category: "dust" })
    setShowCreateEvent(false)
  }

  const getCategoryIcon = (category) => {
    const cat = CATEGORIES.find((c) => c.id === category)
    return cat ? cat.icon : Calendar
  }

  return (
    <PageLayout title="Volunteer Events" subtitle="Join community events and make a difference">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Events List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Search & Filter Bar */}
          <div className="glass-panel rounded-3xl p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 glass-text-muted" />
                <input
                  type="text"
                  placeholder="Search events, organizations, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] text-sm"
                />
              </div>

              {/* Filter Button */}
              <button className="glass-card px-4 py-3 rounded-xl flex items-center gap-2 glass-text-muted hover:glass-text transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[var(--glass-accent)] text-slate-900"
                        : "glass-card glass-text-muted hover:glass-text"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Create Event Button */}
          <button
            onClick={() => setShowCreateEvent(!showCreateEvent)}
            className="w-full py-3 rounded-xl bg-[var(--glass-accent)] text-slate-900 font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--glass-accent)]/25 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            {showCreateEvent ? "Cancel" : "Create New Event"}
          </button>

          {/* Create Event Form */}
          {showCreateEvent && (
            <div className="glass-panel rounded-3xl p-6">
              <h3 className="text-lg font-semibold glass-text mb-4">Create New Event</h3>
              <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)]"
                  required
                />
                <textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] resize-none"
                  required
                />
                <input
                  type="text"
                  placeholder="NGO/Organization Name"
                  value={newEvent.ngo}
                  onChange={(e) => setNewEvent({...newEvent, ngo: e.target.value})}
                  className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)]"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)]"
                    required
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)]"
                    required
                  />
                </div>
                <select
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)]"
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Kharghar, Navi Mumbai">Kharghar, Navi Mumbai</option>
                  <option value="MIDC Mahape, Navi Mumbai">MIDC Mahape, Navi Mumbai</option>
                  <option value="MIDC Taloja, Navi Mumbai">MIDC Taloja, Navi Mumbai</option>
                  <option value="Belapur CBD, Navi Mumbai">Belapur CBD, Navi Mumbai</option>
                  <option value="Seawoods Darave, Navi Mumbai">Seawoods Darave, Navi Mumbai</option>
                  <option value="Nerul Sector 19, Navi Mumbai">Nerul Sector 19, Navi Mumbai</option>
                  <option value="Juinagar, Navi Mumbai">Juinagar, Navi Mumbai</option>
                  <option value="Sanpada, Navi Mumbai">Sanpada, Navi Mumbai</option>
                  <option value="Vashi Sector 17, Navi Mumbai">Vashi Sector 17, Navi Mumbai</option>
                </select>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="w-full px-4 py-3 bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-xl glass-text focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)]"
                >
                  <option value="dust">Dust Cleanup</option>
                  <option value="garbage">Garbage Issues</option>
                  <option value="industrial">Industrial</option>
                  <option value="planting">Tree Planting</option>
                  <option value="education">Education</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[var(--glass-accent)] text-slate-900 font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--glass-accent)]/25"
                >
                  Create Event
                </button>
              </form>
            </div>
          )}

          {/* Events Grid */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold glass-text">Upcoming Events</h3>
              <span className="glass-text-muted text-sm">{filteredEvents.length} events available</span>
            </div>

            {filteredEvents.map((event, index) => {
              const isRegistered = registeredEvents.includes(event.id)
              const progress = (event.volunteers.current / event.volunteers.needed) * 100
              const CategoryIcon = getCategoryIcon(event.category)

              return (
                <div
                  key={event.id}
                  className="glass-panel rounded-3xl overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg?height=200&width=400&query=volunteer event"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2">
                      <CategoryIcon className="w-3.5 h-3.5 text-[var(--glass-accent)]" />
                      <span className="text-xs font-medium glass-text">
                        {CATEGORIES.find((c) => c.id === event.category)?.label}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="glass-card p-2 rounded-full hover:brightness-110 transition-all">
                        <Heart className="w-4 h-4 glass-text-muted" />
                      </button>
                      <button className="glass-card p-2 rounded-full hover:brightness-110 transition-all">
                        <Share2 className="w-4 h-4 glass-text-muted" />
                      </button>
                    </div>

                    {/* NGO Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--glass-accent)] flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-slate-900" />
                      </div>
                      <span className="text-white text-sm font-medium">{event.ngo}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h4 className="text-lg font-semibold glass-text mb-2">{event.title}</h4>
                    <p className="glass-text-muted text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>

                    {/* Event Meta */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 glass-text-muted text-sm">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 glass-text-muted text-sm">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 glass-text-muted text-sm">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>

                    {/* Linked Report */}
                    {event.linkedReport && (
                      <div className="glass-card rounded-xl p-3 mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs glass-text-muted">Responding to verified report</p>
                          <p className="text-sm glass-text font-medium">{event.linkedReport}</p>
                        </div>
                      </div>
                    )}

                    {/* Volunteer Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 glass-text-muted" />
                          <span className="glass-text text-sm font-medium">
                            {event.volunteers.current} / {event.volunteers.needed} volunteers
                          </span>
                        </div>
                        <span className="glass-text-muted text-xs">{event.impact}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--glass-card-bg)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--glass-accent)] transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleRegister(event.id)}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                        isRegistered
                          ? "bg-green-500/20 text-green-500 border border-green-500/30"
                          : "bg-[var(--glass-accent)] text-slate-900 hover:brightness-110 shadow-lg shadow-[var(--glass-accent)]/25"
                      }`}
                    >
                      {isRegistered ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Registered - View Details
                        </span>
                      ) : (
                        "Volunteer for This Event"
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Your Volunteer Stats */}
          <div className="glass-panel rounded-3xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold glass-text mb-1">Your Impact</h3>
            <p className="glass-text-muted text-sm mb-6">Track your volunteer contributions</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-[var(--glass-accent)]">{USER_STATS.eventsJoined}</p>
                <p className="glass-text-muted text-xs mt-1">Events Joined</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold glass-text">{USER_STATS.hoursVolunteered}</p>
                <p className="glass-text-muted text-xs mt-1">Hours Volunteered</p>
              </div>
            </div>

            {/* Impact Score */}
            <div className="glass-card rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="glass-text text-sm font-medium">Impact Score</span>
                <span className="text-[var(--glass-accent)] text-lg font-bold">{USER_STATS.impactScore}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--glass-card-bg)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--glass-accent)] to-green-500"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="glass-text-muted text-xs mt-2">50 more points to next level</p>
            </div>

            {/* Badges */}
            <div>
              <h4 className="glass-text text-sm font-medium mb-3">Earned Badges</h4>
              <div className="flex flex-wrap gap-2">
                {USER_STATS.badges.map((badge) => (
                  <div key={badge} className="glass-card px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[var(--glass-accent)]" />
                    <span className="text-xs glass-text">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Registered Events */}
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold glass-text">Your Events</h3>
              <span className="glass-card px-2 py-1 rounded-full text-xs glass-text">
                {registeredEvents.length} registered
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {events.filter((e) => registeredEvents.includes(e.id)).map((event) => (
                <div key={event.id} className="glass-card rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="glass-text text-sm font-medium truncate">{event.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3 h-3 glass-text-muted" />
                        <span className="glass-text-muted text-xs">{event.date}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 glass-text-muted" />
                  </div>
                </div>
              ))}

              {registeredEvents.length === 0 && (
                <p className="glass-text-muted text-sm text-center py-4">
                  No events registered yet. Browse and join an event!
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-lg font-semibold glass-text mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a
                href="/community"
                className="glass-card rounded-xl p-3 flex items-center gap-3 hover:brightness-110 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--glass-accent)]/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[var(--glass-accent)]" />
                </div>
                <span className="glass-text text-sm font-medium">Community Reports</span>
                <ChevronRight className="w-4 h-4 glass-text-muted ml-auto" />
              </a>
              <a
                href="/map"
                className="glass-card rounded-xl p-3 flex items-center gap-3 hover:brightness-110 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--glass-accent)]/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[var(--glass-accent)]" />
                </div>
                <span className="glass-text text-sm font-medium">View Event Locations</span>
                <ChevronRight className="w-4 h-4 glass-text-muted ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
