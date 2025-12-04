"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Mail, Lock, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validar que sea correo UNTELS
    if (!email.endsWith("@untels.edu.pe")) {
      setError("Debes usar tu correo institucional @untels.edu.pe")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      let result
      if (isRegistering) {
        result = await register(email, password, fullName)
      } else {
        result = await login(email, password)
      }

      if (result.success) {
        onLogin(email)
        setEmail("")
        setPassword("")
        setFullName("")
      } else {
        setError(result.error || "Error al procesar la solicitud")
      }
    } catch (err) {
      setError("Error de conexión. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-center text-2xl">
            {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
          </DialogTitle>
          <DialogDescription className="text-center">
            Usa tu correo institucional de UNTELS para continuar
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Juan Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Correo Institucional</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu.nombre@untels.edu.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Procesando..." : isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering)
                setError("")
              }}
              className="text-primary hover:underline"
            >
              {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
