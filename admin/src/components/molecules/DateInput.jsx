import { Input, Label, CustomErrorMsg } from '../atoms'
import { Field } from 'formik'

export const DateInput = ({ label, id, name, error }) => (
    <div className="col-span-2 sm:col-span-2">
        <Label htmlFor={id}>{label}</Label>
        <Field type="date" id={id} name={name} as={Input} />
        <CustomErrorMsg name={name} />
    </div>
)
