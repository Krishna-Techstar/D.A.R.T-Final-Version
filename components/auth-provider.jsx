"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  isAuthenticated: false
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount (only on client)
    const checkAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false)
        return
      }

      const token = localStorage.getItem("token")
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        await fetchUser()
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me")
      if (response.data && response.data.success && response.data.data) {
        const userData = response.data.data
        setUser({
          id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          points: userData.points || 0
        })
      }
    } catch (error) {
      // Token invalid, clear it
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
      }
      delete api.defaults.headers.common["Authorization"]
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      if (response.data.success) {
        const { token, user } = response.data
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token)
        }
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        setUser(user)
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed. Please try again."
      }
    }
  }

  const register = async (name, email, password, role = "user") => {
    try {
      const response = await api.post("/auth/register", { name, email, password, role })
      if (response.data.success) {
        const { token, user } = response.data
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token)
        }
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        setUser(user)
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed. Please try again."
      }
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
      setUser(null)
      router.push("/auth/signin")
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
