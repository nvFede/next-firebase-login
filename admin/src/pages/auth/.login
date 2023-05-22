import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/atoms/'
import { TextInput } from '@/components/molecules'
import { AuthContext } from '@/context/authContext'
// import { useAuth } from "@/hooks/useAuth";
import { Formik, Form, useFormik } from 'formik'
import AuthCard from '@/components/organisms/AuthCard'
//import { useAuth } from '@/hooks/Auth'

const Login = () => {
    // const { login, loginWithGoogle, error } = useAuth(); // get the register function from useAuth
    // const { dispatch } = useContext(AuthContext); // get the dispatch function from AuthContext

    // useEffect(() => {
    //   const savedEmail = localStorage.getItem("email");
    //   if (savedEmail) {
    //     setEmail(savedEmail);
    //   }
    // }, []);

    // const { login, error } = useAuth({
    //     middleware: 'guest',
    //     redirectIfAuthenticated: '/dashboard',
    // })

    const { state, login } = useContext(AuthContext)
    // console.log('🚀 ~ file: login.jsx:28 ~ Login ~ error:', error)
    // console.log('🚀 ~ file: login.jsx:28 ~ Login ~ login:', login)
    // console.log('🚀 ~ file: login.jsx:28 ~ Login ~ state:', state)

    const router = useRouter()

    const submitForm = async (values, { setSubmitting }) => {
        const { email, password } = values

        // console.log('🚀 ~ file: login.jsx:28 ~ Login ~ error:', error)
        console.log('🚀 ~ file: login.jsx:28 ~ Login ~ login:', login)
        console.log('🚀 ~ file: login.jsx:28 ~ Login ~ state:', state)

        // Call the login function from useAuth
        login({ email, password })
        router.push('/dashboard')
        setIsSubmitting(false)
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

                            {/* {error && <p>{error}</p>} */}
                        </Form>

                        {/* <div className="flex border-t border-gray-100 mt-5 pt-5">
              <Button
                className="bg-[#EA4335] w-full justify-center"
                onClick={loginWithGoogle}
              >
                Continue with Google
              </Button>
            </div> */}
                    </AuthCard>
                )}
            </Formik>
        </div>
    )
}

export default Login
