import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword, createToken, isValidUntelEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validaciones
    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    if (!isValidUntelEmail(email)) {
      return NextResponse.json({ error: "Debes usar tu correo institucional @untels.edu.pe" }, { status: 400 })
    }

    // Buscar usuario
    const result = await query("SELECT id, email, password_hash, full_name FROM users WHERE email = $1", [email])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const user = result.rows[0]

    // Verificar contraseña
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Crear token JWT
    const token = await createToken({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
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
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 })
  }
}
