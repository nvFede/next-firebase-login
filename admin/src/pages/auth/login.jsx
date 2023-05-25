import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/atoms/'
import { TextInput } from '@/components/molecules'
import {
    AuthDispatchContext,
    AuthStateContext,
} from '@/context/authContext'
import { Formik, Form, useFormik } from 'formik'
import AuthCard from '@/components/organisms/AuthCard'
import { loginValidationSchema } from '@/middlewares/authMiddleware'

const Login = () => {
    const { login } = useContext(AuthDispatchContext)
    const state = useContext(AuthStateContext)
    console.log("🚀 ~ file: login.jsx:16 ~ Login ~ state:", state)

    const router = useRouter()

    const submitForm = async (values, { setSubmitting }) => {
        const { email, password } = values

        // Call the login function from useContext
        const result = await login({ email, password })
        console.log("🚀 ~ file: login.jsx:25 ~ Login ~ state:", state)


        setSubmitting(false)
        if (result?.error) {
            console.log(result.error)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={loginValidationSchema}
                onSubmit={submitForm}>
                {({ isSubmitting }) => (
                    <AuthCard>
                        <h2 className="my-3 py-3 text-center text-sm uppercase font-bold bg-gray-200 rounded">
                            App title
                        </h2>
                        <Form>
                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                />
                            </div>

                            {state.error && <p>{state.error}</p>}
                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Login'}
                                </Button>
                            </div>
                        </Form>
                    </AuthCard>
                )}
            </Formik>
        </div>
    )
}

export default Login
