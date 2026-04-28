const AUTH_TOKEN_KEY = "library.auth.token"

type RequestOptions = {
    method?: "GET" | "POST"
    body?: unknown
    token?: string | null
}

export type AuthTokenResponse = {
    access_token: string
    token_type: string
}

export type AuthUser = {
    id: number
    email: string
    name: string
    role: string
    created_at: string
    updated_at: string
}

function getApiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000"
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers = new Headers()
    headers.set("Content-Type", "application/json")

    if (options.token) {
        headers.set("Authorization", `Bearer ${options.token}`)
    }

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
        method: options.method ?? "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
        let message = "Request failed"

        try {
            const payload = (await response.json()) as { detail?: string }
            if (payload.detail) {
                message = payload.detail
            }
        } catch {
            message = response.statusText || message
        }

        throw new Error(message)
    }

    return (await response.json()) as T
}

export async function loginUser(email: string, password: string) {
    return apiRequest<AuthTokenResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
    })
}

export async function signupUser(name: string, email: string, password: string) {
    return apiRequest<AuthUser>("/auth/register", {
        method: "POST",
        body: { name, email, password },
    })
}

export async function fetchCurrentUser(token: string) {
    return apiRequest<AuthUser>("/auth/me", {
        token,
    })
}

export function persistAuthToken(token: string) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function readAuthToken() {
    return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
}
