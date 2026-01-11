"use client"

import { Suspense } from "react"
import { Search, Download, MapPin } from "lucide-react"
import Sidebar from "./sidebar"
import ThemeToggle from "./theme-toggle"
import { useTheme } from "./theme-provider"

function SidebarFallback() {
  return <div className="w-64 glass-panel rounded-3xl p-6 animate-pulse" />
}

export default function PageLayout({ children }) {
  const { theme } = useTheme()

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

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen p-6 gap-6">
        <Suspense fallback={<SidebarFallback />}>
          <Sidebar />
        </Suspense>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 glass-text">
              <MapPin className="w-4 h-4 text-[var(--glass-accent)]" />
              <span className="text-sm font-medium">Kharghar, Navi Mumbai, India</span>
              <span className="glass-text-muted text-sm ml-2">( {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} )</span>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="glass-button p-2.5 rounded-full">
                <Search className="w-4 h-4" />
              </button>
              <button className="glass-button px-4 py-2.5 rounded-full flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download App</span>
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
