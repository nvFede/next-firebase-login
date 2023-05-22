import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/atoms/'
import { TextInput } from '@/components/molecules'
import { AuthContext } from '@/context/authContext'
import { Formik, Form, useFormik } from 'formik'
import AuthCard from '@/components/organisms/AuthCard'

const Login = () => {
    const { state, login } = useContext(AuthContext)

    const router = useRouter()

    const submitForm = async (values, { setSubmitting }) => {
        const { email, password } = values
        // Call the login function from useContext
        await login({ email, password })

        setSubmitting(false)
        router.push('/dashboard')
    }

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
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
