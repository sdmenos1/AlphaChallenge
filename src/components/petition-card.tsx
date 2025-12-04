"use client"

import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, Calendar, User, ImageIcon, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface Petition {
  id: string
  title: string
  description: string
  author: string
  votes: number
  status: "active" | "completed" | "rejected"
  category: string
  createdAt: string
  images?: string[]
  videos?: string[]
}

interface PetitionCardProps {
  petition: Petition
  hasVoted: boolean
  onVote: (id: string) => void
}

export function PetitionCard({ petition, hasVoted, onVote }: PetitionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" })
  }

  const isPopular = petition.votes > 50

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary/50">
      {isPopular && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full gradient-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-lg">
          <Flame className="h-3.5 w-3.5" />
          Popular
        </div>
      )}

      {petition.images && petition.images.length > 0 && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={petition.images[0] || "/placeholder.svg"}
            alt={petition.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {petition.images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur shadow-lg">
              <ImageIcon className="h-3.5 w-3.5" />
              {petition.images.length}
            </div>
          )}
        </div>
      )}

      <CardHeader className="flex-1 space-y-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            {petition.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(petition.createdAt)}
          </div>
        </div>

        <h3 className="line-clamp-2 text-balance font-bold leading-tight text-foreground text-lg group-hover:text-primary transition-colors">
          {petition.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{petition.description}</p>
      </CardHeader>

      <CardFooter className="flex items-center justify-between border-t-2 border-border pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="truncate font-semibold">{petition.author.split("@")[0]}</span>
        </div>

        <Button
          size="sm"
          variant={hasVoted ? "default" : "outline"}
          onClick={() => onVote(petition.id)}
          className={cn(
            "gap-2 transition-all font-bold px-4 py-5 text-base",
            hasVoted
              ? "gradient-primary shadow-lg hover:shadow-xl"
              : "border-2 hover:border-primary hover:bg-primary/10 hover:scale-105",
          )}
        >
          <ArrowUp className={cn("h-5 w-5", hasVoted && "fill-current")} />
          <span className="font-black">{petition.votes}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
