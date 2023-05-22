import { Field } from 'formik'
import { Label, Input, CustomErrorMsg } from '../atoms'

export const NumberInput = ({ label, id, name, error }) => (
    <div className="col-span-8 sm:col-span-2">
        <Label htmlFor={id}>{label}</Label>
        <Field type="number" id={id} name={name} as={Input} />
        <CustomErrorMsg name={name} />
    </div>
)
