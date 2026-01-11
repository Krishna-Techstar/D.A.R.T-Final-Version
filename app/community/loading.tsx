export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="glass-panel rounded-3xl p-8 animate-pulse">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
