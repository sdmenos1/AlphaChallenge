"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

interface User {
  id: number
  email: string
  fullName?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = apiClient.getToken()
    if (token) {
      // Aquí podrías verificar el token con el backend
      // Por ahora solo verificamos que exista
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await apiClient.login(email, password)

    if (response.success && response.data) {
      const { user, token } = response.data
      apiClient.setToken(token)
      setUser(user)
      return { success: true }
    }

    return { success: false, error: response.error }
  }

  const register = async (email: string, password: string, fullName?: string) => {
    const response = await apiClient.register(email, password, fullName)

    if (response.success && response.data) {
      const { user, token } = response.data
      apiClient.setToken(token)
      setUser(user)
      return { success: true }
    }

    return { success: false, error: response.error }
  }

  const logout = () => {
    apiClient.setToken(null)
    setUser(null)
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }
}
