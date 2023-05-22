import React, { useReducer, useContext, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

// Define your context
export const AuthContext = React.createContext()

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
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const auth = useAuth()

    useEffect(() => {
        ;(async () => {
            dispatch({ type: LOADING })
            try {
                const user = await getCurrentUser()
                if (user) {
                    dispatch({ type: AUTHENTICATED, payload: user })
                }
            } catch (error) {
                dispatch({ type: ERROR, payload: error.message })
            }
        })()
    }, [])

    const register = async (email, password) => {
        dispatch({ type: LOADING })
        try {
            const user = await auth.register(email, password)
            dispatch({ type: AUTHENTICATED, payload: user })
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message })
        }
    }

    const login = async (email, password) => {
        dispatch({ type: LOADING })
        try {
            const user = await auth.login(email, password)
            dispatch({ type: AUTHENTICATED, payload: user })
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message })
        }
    }

    const forgotPassword = async email => {
        dispatch({ type: LOADING })
        try {
            await auth.forgotPassword(email)
            // You might want to dispatch another action here to notify the user
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message })
        }
    }

    const logout = async () => {
        try {
            await auth.logout()
            dispatch({ type: SIGN_OUT })
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message })
        }
    }
    useEffect(() => {
        (async () => {
            dispatch({ type: LOADING })
            try {
                const user = await auth.getCurrentUser()
                if (user) {
                    dispatch({ type: AUTHENTICATED, payload: user })
                }
            } catch (error) {
                dispatch({ type: ERROR, payload: error.message })
            }
        })()
    }, [])

    return (
        <AuthContext.Provider
            value={{ state, register, login, forgotPassword, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
