import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// POST - Votar por una petición
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = await verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    const { id } = await params
    const petitionId = id

    // Verificar si ya votó
    const existingVote = await query("SELECT id FROM votes WHERE user_id = $1 AND petition_id = $2", [
      user.id,
      petitionId,
    ])

    if (existingVote.rows.length > 0) {
      // Remover voto
      await query("DELETE FROM votes WHERE user_id = $1 AND petition_id = $2", [user.id, petitionId])

      return NextResponse.json({
        success: true,
        action: "removed",
        message: "Voto removido",
      })
    } else {
      // Agregar voto
      await query("INSERT INTO votes (user_id, petition_id) VALUES ($1, $2)", [user.id, petitionId])

      return NextResponse.json({
        success: true,
        action: "added",
        message: "Voto agregado",
      })
    }
  } catch (error) {
    console.error("[v0] Error voting:", error)
    return NextResponse.json({ error: "Error al procesar voto" }, { status: 500 })
  }
}
