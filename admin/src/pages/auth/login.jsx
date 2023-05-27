import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button, ErrorMsg } from '@/components/atoms/'
import { TextInput } from '@/components/molecules'
import { AuthDispatchContext, AuthStateContext } from '@/context/authContext'
import { Formik, Form, useFormik } from 'formik'
import AuthCard from '@/components/organisms/AuthCard'
import { loginValidationSchema } from '@/middlewares/authMiddleware'

const Login = () => {
    const { login, continueWithGoogle } = useContext(AuthDispatchContext)
    const state = useContext(AuthStateContext)
    // console.log("🚀 ~ file: login.jsx:16 ~ Login ~ state:", state)

    const router = useRouter()

    const googleLogin = async () => {
        const response =  await continueWithGoogle()

        if (googleLogin?.error) {
            console.log(result.error)
        } else {
            router.push('/dashboard')
        }


    }

    const submitForm = async (values, { setSubmitting }) => {
        const { email, password } = values

        // Call the login function from useContext
        const result = await login({ email, password })
        // console.log("🚀 ~ file: login.jsx:25 ~ Login ~ state:", state)

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

                            {state?.user?.error && (
                                <ErrorMsg message={state.user.error} />
                            )}
                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Login'}
                                </Button>
                            </div>
                        </Form>

                        <div className="flex border-t border-gray-100 mt-5 pt-5">
                            <Button
                                className="bg-[#EA4335] w-full justify-center"
                                onClick={googleLogin}>
                                Continue with Google
                            </Button>
                        </div>
                    </AuthCard>
                )}
            </Formik>
        </div>
    )
}

export default Login
