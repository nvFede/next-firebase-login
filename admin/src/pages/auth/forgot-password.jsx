import { Button } from '@/components/atoms'
import { TextInput } from '@/components/molecules'
import AuthCard from '@/components/organisms/AuthCard'
import { AuthContext } from '@/context/authContext'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

const ForgotPassword = () => {
    const [isSubmitting, setSubmitting] = useState(false)
    const { forgotPassword } = useContext(AuthContext)
    const router = useRouter()

    const submitForm = async (values, { setSubmitting }) => {
        const { email } = values
        // Call the login function from useContext
        await forgotPassword(email)

        setSubmitting(false)
        router.push('/auth/login')
    }

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
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

export default ForgotPassword
