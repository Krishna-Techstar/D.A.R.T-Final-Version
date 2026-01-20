"use client"

export default function AqiDisplay({ aqi }) {
  const displayAqi = Math.round(aqi || 0);
  return (
    // Responsive: allow AQI number and details to stack on small screens to avoid horizontal overflow
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:gap-6">
      {/* Main AQI Number */}
      <div className="relative flex items-baseline gap-3 md:gap-4">
        <span className="text-[96px] md:text-[140px] font-extralight text-white leading-none tracking-tighter">
          {displayAqi}
        </span>
        <span className="text-3xl md:text-4xl text-white/60 mt-3 md:mt-4 whitespace-nowrap">AQI</span>
      </div>

      {/* High/Low Values */}
      <div className="flex flex-col gap-2 mt-8">
        <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
          <span className="text-xs text-white/50">H</span>
          <span className="text-white font-semibold">186</span>
        </div>
        <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
          <span className="text-xs text-white/50">L</span>
          <span className="text-white font-semibold">98</span>
        </div>
      </div>
    </div>
  )
}
