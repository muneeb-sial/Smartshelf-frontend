import { AuthService } from "@/services/auth.service";
import { Token, UserOut } from "@/types/api.types";

const AUTH_TOKEN_KEY = "library.auth.token"

export type AuthTokenResponse = Token

export type AuthUser = UserOut

export async function loginUser(email: string, password: string): Promise<AuthTokenResponse> {
    return AuthService.login({ email, password })
}

export async function signupUser(name: string, email: string, password: string): Promise<AuthUser> {
    return AuthService.register({ name, email, password })
}

export async function fetchCurrentUser(_token: string): Promise<AuthUser> {
    // Token is handled by axios interceptor
    return AuthService.getMe()
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
