import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { hashPassword, createToken, isValidUntelEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    // Validaciones
    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    if (!isValidUntelEmail(email)) {
      return NextResponse.json({ error: "Debes usar tu correo institucional @untels.edu.pe" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await query<{ id: number }>("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "Este correo ya está registrado" }, { status: 409 })
    }

    // Hash de la contraseña
    const passwordHash = await hashPassword(password)

    // Crear usuario
    const result = await query<{ id: number; email: string; full_name: string | null }>(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name",
      [email, passwordHash, fullName || null],
    )

    const user = result.rows[0]

    // Crear token JWT
    const token = await createToken({
      id: user.id,
      email: user.email,
      fullName: user.full_name ?? undefined,
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
      token,
    })
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
  }
}
