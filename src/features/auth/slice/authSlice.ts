import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthState, User} from "./auth.type.ts";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
            state.isAuthenticated = true
            state.user = action.payload.user
            state.isLoading = false
            state.error = null
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false
            state.user = null
            state.isLoading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.error = null
        },
        restoreAuth: (state, action: PayloadAction<{ user: User }>) => {
            state.isAuthenticated = true
            state.user = action.payload.user
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    restoreAuth
} = authSlice.actions;

export default authSlice.reducer;
