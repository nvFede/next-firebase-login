import AdminLayout from '@/components/templates/AdminLayout'
import UserLayout from '@/components/templates/UserLayout'

import React, { useContext, useEffect } from 'react'
import { parseCookies } from 'nookies'
import { AuthStateContext } from '@/context/authContext'

const Dashboard = ({ token }) => {
    const state = useContext(AuthStateContext)

    console.log('🚀 ~ file: index.jsx:10 ~ Dashboard ~ state:', state)
    const { user } = state
    console.log('🚀 ~ file: index.jsx:12 ~ Dashboard ~ user:', user)

    return (
        <div>
            {/* {token && <p>{token}</p>} */}
            DASHBOARD
            {user && <div>{user.email}</div>}
            {user && <div>{user.role}</div>}
            {/* {user.role === "admin" ? (
        <AdminLayout></AdminLayout>
      ) : (
        <UserLayout></UserLayout>
      )} */}
        </div>
    )
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context)
    const token = cookies['token']

    // If there is no token, redirect to login page
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }

    return {
        props: { token }, // Will be passed to the page component as props
    }
}

export default Dashboard
