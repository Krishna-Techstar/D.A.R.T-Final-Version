"use client"

export default function GlobeVisualization() {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass-card">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Globe SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full p-4">
          {/* Globe Circle */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Continents simplified */}
          <ellipse cx="100" cy="100" rx="80" ry="80" fill="rgba(148,163,184,0.15)" />

          {/* Grid lines */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
            <line key={`v-${i}`} x1={x} y1="20" x2={x} y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          {[40, 70, 100, 130, 160].map((y, i) => (
            <ellipse
              key={`h-${i}`}
              cx="100"
              cy="100"
              rx="80"
              ry={100 - y}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          ))}

          {/* Location markers */}
          <circle cx="70" cy="80" r="4" fill="#FB923C" className="animate-pulse" />
          <circle cx="70" cy="80" r="8" fill="none" stroke="#FB923C" strokeWidth="1" opacity="0.5" />

          <circle cx="130" cy="120" r="3" fill="#22C55E" />
          <circle cx="90" cy="140" r="3" fill="#FACC15" />
        </svg>
      </div>
    </div>
  )
}
