"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { AuthModal } from "@/components/auth-modal"

export function HeaderWrapper() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const handleLogin = (email: string) => {
    setUserEmail(email)
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail("")
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
    </>
  )
}
