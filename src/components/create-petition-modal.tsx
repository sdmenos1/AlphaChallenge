"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"
import { apiClient } from "@/lib/api-client"

interface CreatePetitionModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
  onPetitionCreated?: () => void
}

export function CreatePetitionModal({ isOpen, onClose, userEmail, onPetitionCreated }: CreatePetitionModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await apiClient.createPetition({
        title,
        description,
        category,
        attachments: attachments.map((url) => ({ url, type: "image/jpeg" })),
      })

      if (response.success) {
        // Resetear formulario
        setTitle("")
        setDescription("")
        setCategory("")
        setAttachments([])
        onClose()

        // Notificar que se creó la petición
        if (onPetitionCreated) {
          onPetitionCreated()
        }
      } else {
        setError(response.error || "Error al crear la petición")
      }
    } catch (err) {
      setError("Error de conexión. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = () => {
    // Simular subida de archivo
    setAttachments([...attachments, `/placeholder.svg?height=200&width=300&query=imagen+peticion`])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear Nueva Petición</DialogTitle>
          <DialogDescription>Comparte tu propuesta con la comunidad UNTELS</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Petición *</Label>
            <Input
              id="title"
              placeholder="Ej: Implementar paneles solares en el campus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sostenibilidad">Sostenibilidad</SelectItem>
                <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                <SelectItem value="Académico">Académico</SelectItem>
                <SelectItem value="Bienestar Estudiantil">Bienestar Estudiantil</SelectItem>
                <SelectItem value="Tecnología">Tecnología</SelectItem>
                <SelectItem value="Servicios">Servicios</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe tu propuesta en detalle. ¿Qué problema resuelve? ¿Cómo beneficiará a la comunidad?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
            <p className="text-xs text-muted-foreground">Mínimo 50 caracteres ({description.length}/50)</p>
          </div>

          <div className="space-y-3">
            <Label>Archivos Adjuntos (Opcional)</Label>
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-border">
                  <img
                    src={attachment || "/placeholder.svg"}
                    alt={`Adjunto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="absolute right-1 top-1 rounded-full bg-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </button>
                </div>
              ))}

              {attachments.length < 5 && (
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted"
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Subir</span>
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Puedes subir hasta 5 imágenes o videos (máx. 10MB cada uno)</p>
          </div>

          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!title || !description || !category || description.length < 50 || isLoading}
            >
              {isLoading ? "Publicando..." : "Publicar Petición"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
