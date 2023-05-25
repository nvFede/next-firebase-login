import { useState, useCallback } from 'react'
import { setCookie, destroyCookie } from 'nookies'

export const useToken = () => {
    const [currentToken, setTokenState] = useState(null)

    const getUserToken = useCallback(user =>
        user.getIdTokenResult().then(tokenResult => tokenResult.token)
    , [])

    const setToken = useCallback(token => {
        setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        setTokenState(token)
    }, [])

    const destroyToken = useCallback(() => {
        destroyCookie(null, 'token', { path: '/' })
        setTokenState(null)
    }, [])

    return {
        currentToken,
        getUserToken,
        setToken,
        destroyToken,
    }
}
