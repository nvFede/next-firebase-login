import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithPopup,
} from 'firebase/auth'

import { useToken } from './useToken'
import { auth } from '@/config/firebase'
import { axiosAuth } from '@/lib/axios'
import { withErrorHandler } from '@/utils/withErrorHandler'

export const useAuth = ({ redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const { getUserToken, setToken, destroyToken } = useToken()

    const handleUserAuth =
        endpoint =>
        async ({ email, password }) => {
            destroyToken() // Clear existing token
            try {
                const userCredential = await (endpoint === 'register'
                    ? createUserWithEmailAndPassword(auth, email, password)
                    : signInWithEmailAndPassword(auth, email, password))
                const user = userCredential.user
                const token = await getUserToken(user)

                const response = await axiosAuth.post(`/auth/${endpoint}`, {})
                setToken(token)
                return response.data //return user from mongodb
            } catch (error) {
                setError(error.message)
                throw error //throw error directly instead of returning an object
            }
        }

    const register = withErrorHandler(handleUserAuth('register'))
    const login = withErrorHandler(handleUserAuth('login'))

    const continueWithGoogle = withErrorHandler(async () => {
        const provider = new GoogleAuthProvider()
        const userCredential = await signInWithPopup(auth, provider)
        const user = userCredential.user
        // return handleUserAuth(user, 'register')
        const token = await getUserToken(user)

        const response = await axiosAuth.post(`/auth/register`, {})
        setToken(token)
        return response.data //return user from mongodb
    })

    const forgotPassword = withErrorHandler(async email => {
        await sendPasswordResetEmail(auth, email)
    })

    const resendEmailVerification = withErrorHandler(async () => {
        const currentUser = auth.currentUser
        if (currentUser) {
            await currentUser.sendEmailVerification()
        }
    })

    const logout = withErrorHandler(async () => {
        await signOut(auth)
        destroyToken()
    })

    return {
        user,
        error,
        register,
        login,
        continueWithGoogle,
        forgotPassword,
        resendEmailVerification,
        logout,
    }
}
