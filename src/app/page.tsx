"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PetitionList } from "@/components/petition-list";
import { CreatePetitionModal } from "@/components/create-petition-modal";
import { AuthModal } from "@/components/auth-modal";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogin = (email: string, fullName?: string) => {
    setUserEmail(email);
    setUserFullName(fullName || "");
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserFullName("");
  };

  const handleCreatePetition = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      setIsCreateModalOpen(true);
    }
  };

  const handlePetitionCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        userFullName={userFullName}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <Hero onCreatePetition={handleCreatePetition} />

      <PetitionList
        key={refreshKey}
        isLoggedIn={isLoggedIn}
        onLoginRequired={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <CreatePetitionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        userEmail={userEmail}
        onPetitionCreated={handlePetitionCreated}
      />
    </div>
  );
}
