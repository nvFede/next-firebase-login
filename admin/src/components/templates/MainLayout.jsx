// pages/MainLayout.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/authContext'
import { useContext } from 'react'
import AdminLayout from './AdminLayout'

export default function MainLayout({ userRole }) {
    const { user } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user])

    return (
        <div>
            {userRole}
            {/* { userRole === 'admin' ? <AdminLayout /> : <GuideLayout /> } */}
        </div>
    )
}

export async function getServerSideProps(context) {
    // add your server-side validation here
    // for example, you can fetch the user data from your API
    // and then determine the user role

    const { req } = context
    const userRole = 'admin' // fetch this value from your API

    return {
        props: {
            userRole,
        },
    }
}
