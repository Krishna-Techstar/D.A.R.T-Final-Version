"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"

// Simple rule-based AI health advisor (no API key needed)
// Provides contextual health advice based on AQI and user questions
function getAIResponse(message, currentAqi) {
  const lowerMessage = message.toLowerCase()
  
  // AQI-based responses
  if (lowerMessage.includes("aqi") || lowerMessage.includes("air quality")) {
    if (currentAqi <= 50) {
      return "Great news! The air quality is good (AQI: " + currentAqi + "). You can enjoy outdoor activities safely. This is the ideal time for exercise, walking, or spending time outside."
    } else if (currentAqi <= 100) {
      return "The air quality is moderate (AQI: " + currentAqi + "). Most people can enjoy outdoor activities, but those with respiratory sensitivities should consider reducing prolonged outdoor exertion."
    } else if (currentAqi <= 150) {
      return "Air quality is unhealthy for sensitive groups (AQI: " + currentAqi + "). Children, elderly, and people with heart or lung conditions should limit outdoor activities. Others should reduce prolonged outdoor exertion."
    } else if (currentAqi <= 200) {
      return "⚠️ Air quality is unhealthy (AQI: " + currentAqi + "). Everyone should reduce outdoor activities, especially sensitive groups. Consider staying indoors and using air purifiers."
    } else {
      return "🚨 Air quality is very unhealthy (AQI: " + currentAqi + "). Avoid all outdoor activities. Stay indoors with windows closed and use air purifiers. Sensitive groups should take extra precautions."
    }
  }

  // Mask-related questions
  if (lowerMessage.includes("mask") || lowerMessage.includes("n95") || lowerMessage.includes("protection")) {
    if (currentAqi > 150) {
      return "Yes, wearing an N95 or KN95 mask is highly recommended when going outside. These masks can filter out 95% of airborne particles including PM2.5. Make sure the mask fits snugly for maximum protection."
    } else if (currentAqi > 100) {
      return "For sensitive groups, wearing an N95 mask is advisable when outdoors. For others, a well-fitted surgical mask can provide some protection during moderate air quality conditions."
    } else {
      return "Masks are generally not necessary when AQI is below 100, but if you're sensitive to air pollution or have respiratory conditions, wearing a mask can provide extra protection."
    }
  }

  // Exercise-related questions
  if (lowerMessage.includes("exercise") || lowerMessage.includes("workout") || lowerMessage.includes("run") || lowerMessage.includes("gym")) {
    if (currentAqi > 150) {
      return "Avoid outdoor exercise when AQI exceeds 150. Move your workouts indoors to a gym or use home workout equipment. Indoor air is typically cleaner with proper ventilation."
    } else if (currentAqi > 100) {
      return "Reduce the intensity and duration of outdoor exercise. Consider indoor alternatives or exercise during times when air quality is better (usually early morning)."
    } else {
      return "You can safely exercise outdoors when AQI is below 100. However, if you have respiratory conditions, monitor how you feel and adjust intensity accordingly."
    }
  }

  // Children-related questions
  if (lowerMessage.includes("child") || lowerMessage.includes("kid") || lowerMessage.includes("baby") || lowerMessage.includes("infant")) {
    if (currentAqi > 100) {
      return "Children are more vulnerable to air pollution. When AQI exceeds 100, keep children indoors as much as possible. Use air purifiers and ensure windows are closed. Limit outdoor playtime."
    } else {
      return "Children can play outdoors when AQI is below 100, but monitor them for any signs of respiratory discomfort. Always ensure they stay hydrated and take breaks."
    }
  }

  // Indoor air quality
  if (lowerMessage.includes("indoor") || lowerMessage.includes("home") || lowerMessage.includes("house") || lowerMessage.includes("purifier")) {
    return "To improve indoor air quality: 1) Keep windows and doors closed when outdoor AQI is high, 2) Use HEPA air purifiers, 3) Avoid smoking or burning candles indoors, 4) Use exhaust fans when cooking, 5) Regularly clean and vacuum to reduce dust."
  }

  // Symptoms
  if (lowerMessage.includes("symptom") || lowerMessage.includes("cough") || lowerMessage.includes("breath") || lowerMessage.includes("wheeze") || lowerMessage.includes("chest")) {
    return "Common symptoms of poor air quality exposure include: coughing, shortness of breath, wheezing, chest tightness, eye irritation, and throat irritation. If symptoms persist or worsen, consult a healthcare professional. Move to an area with better air quality immediately if experiencing severe symptoms."
  }

  // PM2.5 questions
  if (lowerMessage.includes("pm2.5") || lowerMessage.includes("pm 2.5") || lowerMessage.includes("particulate")) {
    return "PM2.5 are fine particles smaller than 2.5 micrometers that can penetrate deep into your lungs and bloodstream. They come from vehicle emissions, industrial processes, and construction. Long-term exposure can cause respiratory and cardiovascular problems. When PM2.5 levels are high, limit outdoor exposure."
  }

  // General health tips
  if (lowerMessage.includes("tip") || lowerMessage.includes("advice") || lowerMessage.includes("recommend") || lowerMessage.includes("help")) {
    return "Here are some general health tips for poor air quality: 1) Check AQI regularly, 2) Plan outdoor activities when air quality is better, 3) Use air purifiers indoors, 4) Keep windows closed during high pollution, 5) Stay hydrated, 6) Consider wearing masks when AQI is high, 7) Monitor symptoms and seek medical help if needed."
  }

  // Greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm your D.A.R.T Health Assistant. I can help you understand how air quality affects your health and provide personalized recommendations. What would you like to know? You can ask about masks, exercise, children's health, symptoms, or general air quality advice."
  }

  // Default response
  return "I'm here to help with air quality and health-related questions. You can ask me about: current AQI recommendations, masks and protection, exercise guidelines, children's health, indoor air quality, symptoms, or general health tips. What would you like to know?"
}

export default function AIHealthChat({ currentAqi = 156 }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your D.A.R.T Health Assistant. I can help you understand how air quality affects your health. The current AQI is " + currentAqi + ". How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    // Get AI response
    const aiResponse = getAIResponse(input.trim(), currentAqi)

    const assistantMessage = {
      id: messages.length + 2,
      role: "assistant",
      content: aiResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div className="glass-panel rounded-3xl p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--glass-border)]">
        <div className="w-10 h-10 rounded-xl bg-[var(--glass-accent)]/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[var(--glass-accent)]" />
        </div>
        <div>
          <h3 className="glass-text font-semibold">AI Health Assistant</h3>
          <p className="glass-text-muted text-xs">Ask me anything about air quality and health</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[var(--glass-accent)]/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[var(--glass-accent)]" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-[var(--glass-accent)]/20 glass-text rounded-br-sm"
                  : "glass-card glass-text rounded-bl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs glass-text-muted mt-1 block">
                {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-400" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-[var(--glass-accent)]/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[var(--glass-accent)]" />
            </div>
            <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-3">
              <Loader2 className="w-5 h-5 text-[var(--glass-accent)] animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about air quality, health tips, masks, exercise..."
          className="flex-1 glass-card px-4 py-3 rounded-xl glass-text placeholder:glass-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="glass-button p-3 rounded-xl bg-[var(--glass-accent)] text-slate-900 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {["What should I do?", "Should I wear a mask?", "Is it safe to exercise?"].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setInput(suggestion)}
            className="glass-card px-3 py-1.5 rounded-full text-xs glass-text-muted hover:glass-text transition-colors"
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
