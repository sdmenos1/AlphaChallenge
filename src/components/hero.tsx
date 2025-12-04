"use client"

import { Button } from "@/components/ui/button"
import { Plus, Users, Vote, Sparkles, TrendingUp, Zap } from "lucide-react"

interface HeroProps {
  onCreatePetition: () => void
}

export function Hero({ onCreatePetition }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5" />

      {/* Elementos decorativos flotantes */}
      <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div
        className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-white shadow-lg animate-pulse">
            <Sparkles className="h-5 w-5" />
            Participación y Sostenibilidad
          </div>

          <h1 className="mb-8 text-balance font-sans text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
            <span className="text-gradient">Tu voz</span>
            <br />
            <span className="text-foreground">construye UNTELS</span>
          </h1>

          <p className="mb-10 text-pretty text-xl leading-relaxed text-muted-foreground md:text-2xl font-medium">
            Crea propuestas, vota por lo que importa y hagamos realidad el cambio que queremos ver
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={onCreatePetition}
              className="gradient-primary gap-3 text-lg font-bold px-8 py-7 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Plus className="h-6 w-6" />
              Crear Petición
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-3 text-lg font-bold px-8 py-7 border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all hover:scale-105 bg-transparent"
              onClick={() => {
                document.getElementById("peticiones")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <TrendingUp className="h-6 w-6" />
              Ver Peticiones
            </Button>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-4 hover-lift rounded-2xl bg-card p-6 shadow-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Comunidad Activa</h3>
              <p className="text-sm text-muted-foreground font-medium">Todos participan, todos cuentan</p>
            </div>

            <div className="flex flex-col items-center gap-4 hover-lift rounded-2xl bg-card p-6 shadow-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent shadow-lg">
                <Vote className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Voto Democrático</h3>
              <p className="text-sm text-muted-foreground font-medium">Tu voto define las prioridades</p>
            </div>

            <div className="flex flex-col items-center gap-4 hover-lift rounded-2xl bg-card p-6 shadow-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Impacto Real</h3>
              <p className="text-sm text-muted-foreground font-medium">Cambios que transforman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
