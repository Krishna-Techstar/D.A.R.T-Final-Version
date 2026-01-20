"use client"

export default function AqiDisplay({ aqi }) {
  const displayAqi = Math.round(aqi || 0);
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      {/* Main AQI Number */}
      <div className="relative flex items-baseline gap-3 sm:gap-4">
        <span className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-extralight text-white leading-none tracking-tighter">{displayAqi}</span>
        <span className="text-2xl sm:text-3xl md:text-4xl text-white/60 mt-2 sm:mt-3 md:mt-4 whitespace-nowrap">AQI</span>
      </div>

      {/* High/Low Values */}
      <div className="flex flex-col gap-2 mt-4 sm:mt-6 md:mt-8">
        <div className="glass-card px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 sm:gap-3">
          <span className="text-xs text-white/50">H</span>
          <span className="text-white font-semibold text-sm sm:text-base">186</span>
        </div>
        <div className="glass-card px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 sm:gap-3">
          <span className="text-xs text-white/50">L</span>
          <span className="text-white font-semibold text-sm sm:text-base">98</span>
        </div>
      </div>
    </div>
  )
}
