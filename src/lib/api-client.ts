// Cliente para hacer peticiones a la API desde el frontend

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface AuthResponse {
  user: {
    id: number
    email: string
    fullName?: string
  }
  token: string
}

export interface Petition {
  id: string
  title: string
  description: string
  category: string
  status: "active" | "completed" | "rejected"
  votes_count: number
  created_at: string
  author_email: string
}

export interface PetitionsResponse {
  petitions: Petition[]
}

class ApiClient {
  private baseUrl = "/api"
  private token: string | null = null

  constructor() {
    // Cargar token del localStorage si existe
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth_token", token)
      } else {
        localStorage.removeItem("auth_token")
      }
    }
  }

  getToken() {
    return this.token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...(options.headers || {})
    });

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Error en la petición",
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error("[v0] API request error:", error)
      return {
        success: false,
        error: "Error de conexión",
      }
    }
  }

  // Autenticación
  async register(email: string, password: string, fullName?: string) {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    })
  }

  async login(email: string, password: string) {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  // Peticiones
  async getPetitions(params?: {
    category?: string
    status?: string
    sortBy?: "votes" | "recent"
  }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set("category", params.category)
    if (params?.status) searchParams.set("status", params.status)
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy)

    const query = searchParams.toString()
    return this.request<PetitionsResponse>(`/petitions${query ? `?${query}` : ""}`)
  }

  async getPetition(id: string) {
    return this.request(`/petitions/${id}`)
  }

  async createPetition(data: {
    title: string
    description: string
    category: string
    attachments?: Array<{ url: string; type: string }>
  }) {
    return this.request("/petitions", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async votePetition(id: string) {
    return this.request(`/petitions/${id}/vote`, {
      method: "POST",
    })
  }
}

export const apiClient = new ApiClient()
