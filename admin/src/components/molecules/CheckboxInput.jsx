import { Label, CustomErrorMsg } from '../atoms'
import { Field } from 'formik'

export const CheckboxInput = ({ name, id, label, error }) => (
    <div className="checkbox flex gap-2 items-center">
        <Field
            type="checkbox"
            id={id}
            name={name}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <Label htmlFor={name}>{label}</Label>
        <CustomErrorMsg name={name} />
    </div>
)
