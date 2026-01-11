"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={() => {
        console.log("[v0] Theme toggle clicked, current theme:", theme)
        toggleTheme()
      }}
      className="glass-button p-2.5 rounded-full transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
    </button>
  )
}
