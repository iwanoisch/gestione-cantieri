export interface User {
    id: string
    username: string
    password: string
    role: string
    name: string
    company: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: Omit<User, 'password'> | null // Esclude password
    isLoading: boolean
    error: string | null
}
