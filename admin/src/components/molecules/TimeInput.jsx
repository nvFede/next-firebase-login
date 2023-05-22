import { Input, Label, CustomErrorMsg } from '../atoms'
import { Field } from 'formik'

export const TimeInput = ({ label, id, name, error }) => (
    <div className="col-span-2 sm:col-span-2">
        <Label htmlFor={id}>{label}</Label>
        <Field
            type="time"
            id={id}
            name={name}
            as={Input}
            step={900} /* 15 minutes in seconds */
        />
        <CustomErrorMsg name={name} />
    </div>
)
