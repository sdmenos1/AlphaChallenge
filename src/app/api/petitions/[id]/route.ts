import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

// GET - Obtener una petición específica
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await query(
      `SELECT 
        p.*,
        COALESCE(json_agg(
          json_build_object('id', pa.id, 'fileUrl', pa.file_url, 'fileType', pa.file_type)
        ) FILTER (WHERE pa.id IS NOT NULL), '[]') as attachments
      FROM petitions p
      LEFT JOIN petition_attachments pa ON p.id = pa.petition_id
      WHERE p.id = $1
      GROUP BY p.id`,
      [params.id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Petición no encontrada" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      petition: result.rows[0],
    })
  } catch (error) {
    console.error("[v0] Error fetching petition:", error)
    return NextResponse.json({ error: "Error al obtener petición" }, { status: 500 })
  }
}
