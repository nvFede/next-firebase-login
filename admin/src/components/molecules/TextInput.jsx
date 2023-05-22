import { Input, Label, CustomErrorMsg } from '../atoms'
import { Field } from 'formik'

export const TextInput = ({ label, id, name, type, error, ...props }) => (
    <div className="col-span-8 sm:col-span-2">
        <Label htmlFor={id}>{label}</Label>
        <Field type={type} id={id} name={name} as={Input} {...props} />
        <CustomErrorMsg name={name} />
    </div>
)
