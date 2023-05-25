import React, { useReducer, useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

// Define your context
export const AuthStateContext = React.createContext()
export const AuthDispatchContext = React.createContext()

// Define initial state
const initialState = {
    user: null,
    error: null,
    loading: false,
}

const LOADING = 'LOADING'
const AUTHENTICATED = 'AUTHENTICATED'
const ERROR = 'ERROR'
const SIGN_OUT = 'SIGN_OUT'

// Define your reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case AUTHENTICATED:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

// Create your provider
const useSafeDispatch = dispatch => {
    return useCallback(
        async (asyncFunction, ...params) => {
            try {
                const result = await asyncFunction(...params)
                dispatch({ type: AUTHENTICATED, payload: result })
            } catch (error) {
                dispatch({ type: ERROR, payload: error.message })
            }
        },
        [dispatch],
    )
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const auth = useAuth()
    const safeDispatch = useSafeDispatch(dispatch)

    // useEffect(() => {
    //     safeDispatch(getCurrentUser)
    // }, [safeDispatch])

    const register = async (email, password) =>
        safeDispatch(auth.register, email, password)

    const login = async (email, password) =>
        safeDispatch(auth.login, email, password)

    const continueWithGoogle = async () => safeDispatch(auth.continueWithGoogle)

    const forgotPassword = async email =>
        safeDispatch(auth.forgotPassword, email)

    const logout = async () => safeDispatch(auth.logout)

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider
                value={{
                    register,
                    login,
                    forgotPassword,
                    logout,
                    continueWithGoogle,
                }}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}
