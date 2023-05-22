import { Input, Label, CustomErrorMsg } from '../atoms'
import { Field } from 'formik'

export const TextareaInput = ({ label, id, name, error }) => (
    <div className="col-span-8 sm:col-span-8">
        <Label htmlFor={id}>{label}</Label>
        <Field
            as="textarea"
            id={id}
            name={name}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
        <CustomErrorMsg name={name} />
    </div>
)
