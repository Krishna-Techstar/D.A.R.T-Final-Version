"use client"

import { Suspense, useState } from "react"
import { Search, Download, MapPin, Menu } from "lucide-react"
import Sidebar from "./sidebar"
import ThemeToggle from "./theme-toggle"
import { useTheme } from "./theme-provider"

function SidebarFallback() {
  return <div className="w-64 glass-panel rounded-3xl p-6 animate-pulse" />
}

export default function PageLayout({ children }) {
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 z-0"
        style={{
          backgroundImage:
            theme === "dark"
              ? `url('/dramatic-stormy-sky-with-dark-clouds-and-amber-sun.jpg')`
              : `url('/bright-sunny-sky-with-soft-white-clouds-and-golden.jpg')`,
        }}
      />

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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen p-3 sm:p-4 md:p-6 gap-3 md:gap-6">
        {/* Sidebar - Hidden on mobile, overlay when open, always visible on desktop */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Suspense fallback={<SidebarFallback />}>
            <Sidebar onMobileClose={() => setMobileMenuOpen(false)} />
          </Suspense>
        </div>

        <div className="flex-1 flex flex-col w-full lg:w-auto min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 lg:mb-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden glass-button p-2.5 rounded-full self-start"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 glass-text">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--glass-accent)] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">Kharghar, Navi Mumbai, India</span>
              </div>
              <span className="glass-text-muted text-xs sm:text-sm sm:ml-2">( {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} )</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <ThemeToggle />
              <button className="glass-button p-2.5 rounded-full">
                <Search className="w-4 h-4" />
              </button>
              <button className="glass-button px-3 sm:px-4 py-2.5 rounded-full flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Download App</span>
              </button>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  )
}
