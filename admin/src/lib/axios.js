import axios from 'axios'
import { auth } from '@/config/firebase'
import config from '@/config'

const baseURL = config.api.url

export const axiosPublic = axios.create({
    baseURL,
})

export const axiosAuth = axios.create({
    baseURL,
})

axiosAuth.interceptors.request.use(
    async config => {
        try {
            const user = auth.currentUser
            if (user) {
                const token = await user.getIdToken(true)
                config.headers.token = token
            } else {
                config.headers.token = ''
            }
        } catch (error) {
            console.error('Failed to get user token:', error)
            config.headers.token = ''
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)
