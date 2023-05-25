import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/atoms/'
import { Form, Formik } from 'formik'
import { AuthContext } from '@/context/authContext'
import { registerValidationSchema } from '@/middlewares/authMiddleware'
import AuthCard from '@/components/organisms/AuthCard'
import { TextInput } from '@/components/molecules'

const Register = () => {
    const router = useRouter()
    const { register, error, continueWithGoogle } = useContext(AuthContext) // get the dispatch function from AuthContext

    const submitForm = async (values, { setSubmitting }) => {
        const { email, password } = values
        // Call the register function from useContext

        const response = await register({ email, password })
        setSubmitting(false)

        // Check if response contains an error. If not, navigate to the dashboard.
        if (!response.error) {

            router.push('/dashboard')
        } else {
            console.log("🚀 ~ file: register.jsx:23 ~ submitForm ~ error:", response.error)
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

                            {error && <p>{error}</p>}
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
