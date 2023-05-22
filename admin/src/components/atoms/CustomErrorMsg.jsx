import { ErrorMessage } from 'formik'
import React from 'react'

export const CustomErrorMsg = ({ name }) => {
    return (
        <ErrorMessage
            name={name}
            component="div"
            className="text-red-600 text-xs mt-1"
        />
    )
}
