import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "tu-secreto-super-seguro-cambialo-en-produccion")

export interface User {
  id: number
  email: string
  fullName?: string
}

// Hash de contraseña
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verificar contraseña
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Crear JWT token
export async function createToken(user: User): Promise<string> {
  return new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(JWT_SECRET)
}

// Verificar JWT token
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    const payload = verified.payload as { userId: number; email: string; fullName?: string }
    return {
      id: payload.userId,
      email: payload.email,
      fullName: payload.fullName,
    }
  } catch (error) {
    console.error("[v0] Token verification failed:", error)
    return null
  }
}

// Validar email UNTELS
export function isValidUntelEmail(email: string): boolean {
  return email.endsWith("@untels.edu.pe")
}
