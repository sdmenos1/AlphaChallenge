"use client";

import { useState, useEffect } from "react";
import { PetitionCard } from "@/components/petition-card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock } from "lucide-react";
import { apiClient, type Petition } from "@/lib/api-client";

interface PetitionListProps {
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

export function PetitionList({ isLoggedIn, onLoginRequired }: PetitionListProps) {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [filter, setFilter] = useState<"trending" | "recent">("trending");
  const [votedPetitions, setVotedPetitions] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPetitions();
  }, [filter]);

  const loadPetitions = async () => {
    setIsLoading(true);
    const response = await apiClient.getPetitions({
      sortBy: filter === "trending" ? "votes" : "recent",
    });

    if (response.success && response.data) {
      setPetitions(response.data.petitions || []);
    }
    setIsLoading(false);
  };

  const handleVote = async (petitionId: string) => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    const response = await apiClient.votePetition(petitionId);

    if (response.success) {
      // Actualizar UI localmente
      setPetitions((prev) =>
        prev.map((p) =>
          p.id === petitionId
            ? {
                ...p,
                votes_count: votedPetitions.has(petitionId)
                  ? p.votes_count - 1
                  : p.votes_count + 1,
              }
            : p
        )
      );

      setVotedPetitions((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(petitionId)) {
          newSet.delete(petitionId);
        } else {
          newSet.add(petitionId);
        }
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <section id="peticiones" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Cargando peticiones...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="peticiones" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Peticiones Activas
            </h2>
            <p className="mt-2 text-muted-foreground">
              Vota por las propuestas que quieres ver implementadas
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "trending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("trending")}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Populares
            </Button>
            <Button
              variant={filter === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("recent")}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Recientes
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {petitions.map((petition) => (
            <PetitionCard
              key={petition.id}
              petition={{
                ...petition,
                votes: petition.votes_count,
                createdAt: petition.created_at,
                author: petition.author_email,
              }}
              hasVoted={votedPetitions.has(petition.id)}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
