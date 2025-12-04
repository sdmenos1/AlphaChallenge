import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

// GET - Obtener todas las peticiones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status") || "active"
    const sortBy = searchParams.get("sortBy") || "votes" // 'votes' o 'recent'

    let queryText = `
      SELECT 
        p.*,
        COALESCE(json_agg(
          json_build_object('id', pa.id, 'fileUrl', pa.file_url, 'fileType', pa.file_type)
        ) FILTER (WHERE pa.id IS NOT NULL), '[]') as attachments
      FROM petitions p
      LEFT JOIN petition_attachments pa ON p.id = pa.petition_id
      WHERE p.status = $1
    `
    const params: any[] = [status]

    if (category) {
      queryText += ` AND p.category = $${params.length + 1}`
      params.push(category)
    }

    queryText += " GROUP BY p.id"

    if (sortBy === "votes") {
      queryText += " ORDER BY p.votes_count DESC, p.created_at DESC"
    } else {
      queryText += " ORDER BY p.created_at DESC"
    }

    const result = await query(queryText, params)

    return NextResponse.json({
      success: true,
      petitions: result.rows,
    })
  } catch (error) {
    console.error("[v0] Error fetching petitions:", error)
    return NextResponse.json({ error: "Error al obtener peticiones" }, { status: 500 })
  }
}

// POST - Crear nueva petición
export async function POST(request: NextRequest) {
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

    const { title, description, category, attachments } = await request.json()

    // Validaciones
    if (!title || !description || !category) {
      return NextResponse.json({ error: "Título, descripción y categoría son requeridos" }, { status: 400 })
    }

    if (description.length < 50) {
      return NextResponse.json({ error: "La descripción debe tener al menos 50 caracteres" }, { status: 400 })
    }

    // Crear petición
    const result = await query(
      `INSERT INTO petitions (title, description, category, author_id, author_email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, category, user.id, user.email],
    )

    const petition = result.rows[0]

    // Agregar archivos adjuntos si existen
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        await query("INSERT INTO petition_attachments (petition_id, file_url, file_type) VALUES ($1, $2, $3)", [
          petition.id,
          attachment.url,
          attachment.type,
        ])
      }
    }

    return NextResponse.json({
      success: true,
      petition,
    })
  } catch (error) {
    console.error("[v0] Error creating petition:", error)
    return NextResponse.json({ error: "Error al crear petición" }, { status: 500 })
  }
}
