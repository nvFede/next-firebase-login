import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-z]/, 'Password must contain at least one lowercase char.')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase char.')
        .matches(
            /[a-zA-Z]+[^a-zA-Z\s]+/,
            'Password must contain at least one number or special char (@, !, #, etc.).',
        )
        .required('Required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Required"),
    // acceptTerms: Yup.bool().oneOf(
    //   [true],
    //   "You must accept the terms and conditions."
    // ),
})
