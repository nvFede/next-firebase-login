import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/atoms/'
import { Form, Formik } from 'formik'
import { AuthDispatchContext, AuthStateContext } from '@/context/authContext'
import { registerValidationSchema } from '@/middlewares/authMiddleware'
import AuthCard from '@/components/organisms/AuthCard'
import { TextInput } from '@/components/molecules'

const Register = () => {
    const router = useRouter()
    //    const { register, error, continueWithGoogle } = useContext(AuthContext) // get the dispatch function from AuthContext

    const { register, continueWithGoogle } = useContext(AuthDispatchContext)
    const state = useContext(AuthStateContext)
    console.log('🚀 ~ file: login.jsx:16 ~ Login ~ state:', state)

    const submitForm = async (values, { setSubmitting }) => {
        const { email, password } = values
        // Call the register function from useContext

        // Call the login function from useContext
        const result = await register({ email, password })
        console.log('🚀 ~ file: login.jsx:25 ~ REGISTER ~ state:', state)

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
                    confirmPassword: '',
                }}
                validationSchema={registerValidationSchema}
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

                            <div className="mt-4">
                                <TextInput
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'SignUp'}
                                </Button>
                            </div>

                            {/* {state.user.error && <p>{state.user.error}</p>} */}
                        </Form>

                        <div className="flex border-t border-gray-100 mt-5 pt-5">
                            <Button
                                className="bg-[#EA4335] w-full justify-center"
                                onClick={continueWithGoogle}>
                                Continue with Google
                            </Button>
                        </div>
                    </AuthCard>
                )}
            </Formik>
        </div>
    )
}

export default Register
