"use client"

import { Suspense, useState, useEffect } from "react"
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

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      // Restore on cleanup
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [mobileMenuOpen]);

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

      {/* Mobile Menu Overlay - Blocks background interaction when sidebar is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          style={{ 
            pointerEvents: 'auto',
            touchAction: 'none'
          }}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen p-3 sm:p-4 md:p-6 gap-3 md:gap-6">
        {/* Sidebar - Hidden on mobile, overlay when open, always visible on desktop */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          style={{ 
            // Explicit pointer events: enabled when open, disabled when closed
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            // Explicit touch action: manipulation for fast touch response
            touchAction: mobileMenuOpen ? 'manipulation' : 'none',
            // Ensure this container doesn't block child events
            isolation: 'isolate',
            WebkitOverflowScrolling: 'touch'
          }}
          onClick={(e) => {
            // Prevent overlay from closing when clicking inside sidebar
            e.stopPropagation()
          }}
          onTouchStart={(e) => {
            // Prevent overlay from receiving touch events when touching sidebar
            e.stopPropagation()
          }}
        >
          <Suspense fallback={<SidebarFallback />}>
            <Sidebar onMobileClose={() => setMobileMenuOpen(false)} />
          </Suspense>
        </div>

        <div className="flex-1 flex flex-col w-full lg:w-auto min-w-0">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            {/* Mobile: top row aligns menu + actions in a single line */}
            <div className="flex items-center justify-between gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="glass-button p-2.5 rounded-full flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                <ThemeToggle />
                <button className="glass-button p-2.5 rounded-full">
                  <Search className="w-4 h-4" />
                </button>
                <button className="glass-button px-3 py-2.5 rounded-full flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-medium hidden sm:inline">Download</span>
                </button>
              </div>
            </div>

            {/* Mobile: location/date row below */}
            <div className="mt-3 flex items-center gap-2 lg:hidden glass-text">
              <MapPin className="w-4 h-4 text-[var(--glass-accent)] flex-shrink-0" />
              <span className="text-xs font-medium truncate">Kharghar, Navi Mumbai, India</span>
              <span className="glass-text-muted text-xs ml-2 flex-shrink-0">
                ({" "}
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                )
              </span>
            </div>

            {/* Desktop: unchanged header */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 glass-text">
                <MapPin className="w-4 h-4 text-[var(--glass-accent)]" />
                <span className="text-sm font-medium">Kharghar, Navi Mumbai, India</span>
                <span className="glass-text-muted text-sm ml-2">
                  ( {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} )
                </span>
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
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  )
}
