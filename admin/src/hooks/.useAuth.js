import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initializeApp, getApps } from 'firebase/app'
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
import { setCookie, destroyCookie } from 'nookies'

import { auth } from '@/config/firebase'

import { axiosAuth } from '@/lib/axios'

export const useAuth = ({ redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    //   useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //       if (user) {
    //         setUser(user);
    //         if (redirectIfAuthenticated) router.push(redirectIfAuthenticated);
    //       } else {
    //         setUser(null);
    //         if (redirectIfAuthenticated) router.push("/login");
    //       }
    //     });
    //   }, [router, redirectIfAuthenticated]);

    const getUserToken = async user => {
        const tokenResult = await user.getIdTokenResult()
        //console.log('🚀 ~ file: Auth.js:58 ~ User Token:', tokenResult.token)
        return tokenResult.token
    }

    const setToken = token => {
        return new Promise(resolve => {
            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            resolve()
        })
    }

    const destroyToken = () => {
        destroyCookie(null, 'token', { path: '/' })
    }

    const register = async ({ email, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )
            const user = userCredential.user
            //console.log('Registered user:', user.email)

            const token = await getUserToken(user)

            const response = await axiosAuth.post('/auth/register', {})

            await setToken(token) // wait until the cookie is set

            return response.data
        } catch (error) {
            setError(error.message)
        }
    }

    // useAuth.js
    const login = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            )
            const user = userCredential.user

            // Get user token after login
            const token = await getUserToken(user)

            const response = await axiosAuth.post('/auth/login', {})

            await setToken(token) // wait until the cookie is set

            return response.data
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    }

    const continueWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const userCredential = await signInWithPopup(auth, provider)
            const user = userCredential.user

            // Get user token after login
            const token = await getUserToken(user)

            const response = await axiosAuth.post('/auth/register', {})

            await setToken(token) // wait until the cookie is set

            return response.data
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }
    }

    const forgotPassword = async email => {
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            setError(error.message)
        }
    }


    const resendEmailVerification = async () => {
        try {
            const currentUser = auth.currentUser
            if (currentUser) {
                await currentUser.sendEmailVerification()
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            setError(error.message)
        }
    }

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
