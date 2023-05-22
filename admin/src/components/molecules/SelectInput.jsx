import { Label, CustomErrorMsg } from '../atoms'
import { Field } from 'formik'

export const SelectInput = ({ id, label, name, options, error }) => (
    <div className="col-span-8 sm:col-span-2">
        <Label htmlFor={name}>{label}</Label>
        <Field
            as="select"
            name={name}
            id={id}
            className="rounded-md shadow-sm w-full block mt-2 py-2 border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            {options.map(option => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </Field>
        <CustomErrorMsg name={name} />
    </div>
)
