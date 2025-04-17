import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {loginFailure, loginStart, loginSuccess, logout, restoreAuth} from "../slice/authSlice.ts";
import {mockCheckAuth, mockLogin} from "../api/auth.api.ts";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);

    const login = async (username: string, password: string) => {
        dispatch(loginStart())

        try {
            const user = await mockLogin(username, password)

            // Salva in localStorage per "ricordami"
            localStorage.setItem('auth_user', JSON.stringify(user));

            dispatch(loginSuccess({user}))
            return {success: true}
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto'
            dispatch(loginFailure(message))
            return {success: false, error: message}
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('auth_user')
        dispatch(logout());
    }

    const checkAuth = async () => {
        try {
            const user = await mockCheckAuth()
            dispatch(restoreAuth({user}))
            return true
        } catch {
            return false
        }
    }

    return {
        ...authState,
        login,
        logout: logoutUser,
        checkAuth
    }
}


// import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
// import {MOCK_USERS} from "../../../dataMok/usersMok.ts";
// import {logout, setAuth} from "../slice/authSlice.ts";
//
// export const useAuth = () => {
//     const dispatch = useAppDispatch()
//     const { isAuthenticated, user } = useAppSelector((state) => state.auth)
//
//     /**
//      * Effettua il login con username e password
//      */
//     const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
//         try {
//             // Simula un ritardo della chiamata API
//             await new Promise(resolve => setTimeout(resolve, 500))
//             // Simulazione chiamata API
//             //  const response = await api.post('/auth/login', credentials)
//             //  const userData = response.data
//
//             // Simulazione chiamata API
//             const getUserData = MOCK_USERS.find(
//                 u => u.username === username && u.password === password
//             )
//
//             if (!getUserData) {
//                 return { success: false, error: 'Credenziali non valide' }
//             }
//
//             // Crea l'oggetto user da salvare nello store (senza password)
//             const userData = {
//                 id: getUserData.id,
//                 username: getUserData.username,
//                 role: getUserData.role,
//                 name: getUserData.name,
//                 company: getUserData.company,
//             }
//
//             dispatch(setAuth({
//                 isAuthenticated: true,
//                 user: userData
//             }))
//
//
//             localStorage.setItem('auth', JSON.stringify(userData))
//
//             return { success: true }
//         } catch (error) {
//             console.error('Login error:', error)
//             return { success: false, error: 'Errore durante il login' }
//         }
//     }
//
//     /**
//      * Effettua il logout
//      */
//     const logoutUser = () => {
//         dispatch(logout())
//     }
//
//     /**
//      * Verifica se l'utente ha un determinato ruolo
//      */
//     const hasRole = (role: string): boolean => {
//         return user?.role === role
//     }
//
//     /**
//      * Verifica se l'utente ha almeno uno dei ruoli specificati
//      */
//     const hasAnyRole = (roles: string[]): boolean => {
//         return roles.some(role => user?.role === role)
//     }
//
//     /**
//      * Verifica lo stato di autenticazione all'avvio
//      */
//     const checkAuth = () => {
//         const savedAuth = localStorage.getItem('auth')
//         if (savedAuth) {
//             try {
//                 const userData = JSON.parse(savedAuth)
//                 dispatch(setAuth({
//                     : true,
//                     user: userData
//                 }))
//             } catch (error) {
//                 console.error('Error parsing saved auth:', error)
//                 localStorage.removeItem('auth')
//             }
//         }
//     }
//
//     return {
//         isAuthenticated,
//         user,
//         login,
//         logout: logoutUser,
//         hasRole,
//         hasAnyRole,
//         checkAuth
//     }
// }
