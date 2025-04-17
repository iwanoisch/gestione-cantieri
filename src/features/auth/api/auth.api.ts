import {MOCK_USERS} from "../../../dataMok/usersMok.ts";
import {User} from "../slice/auth.type.ts";

export const mockLogin = async (username: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simula ritardo rete

    const user = MOCK_USERS.find(
        u => u.username === username && u.password === password
    )

    if (!user) {
        throw new Error('Credenziali non valide')
    }

    // Rimuovi password prima di restituire
    // const { password: _, ...userWithoutPassword } = user
    return user;
}

// Verifica sessione (per mantenere il login)
export const mockCheckAuth = async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300))

    // Simula verifica token
    const savedUser = localStorage.getItem('auth_user')
    if (!savedUser) {
        throw new Error('Non autenticato')
    }

    return JSON.parse(savedUser)
}


// Versione con API reale
// import axios from 'axios'
// import { User } from '../slice/auth.type'
//
// const API_URL = import.meta.env.VITE_API_URL
//
// export const login = async (username: string, password: string): Promise<User> => {
//     const response = await axios.post(`${API_URL}/auth/login`, { username, password })
//     return response.data.user
// }
//
// export const checkAuth = async (): Promise<User> => {
//     const response = await axios.get(`${API_URL}/auth/check`)
//     return response.data.user
// }

// import axios from 'axios'

// const API_URL = import.meta.env.VITE_API_URL || 'https://api.tua-app.com'
//
// export const authApi = {
//     async login(credentials: LoginCredentials) {
//         const response = await axios.post(`${API_URL}/auth/login`, credentials)
//         return response.data
//     },
//
//     async logout() {
//         const response = await axios.post(`${API_URL}/auth/logout`)
//         return response.data
//     },
//
//     async checkSession() {
//         const response = await axios.get(`${API_URL}/auth/session`)
//         return response.data
//     }
// }

// Esempio di uso nell'hooks:
// const response = await authApi.login(credentials)
// const userData = response.user
