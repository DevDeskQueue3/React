import { useState } from "react";
import * as yup from "yup";



export default function useForm(initialValues, formSchema) {
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);

    const handleChanges = e => {
        e.persist();
        
        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setFormErrors({
                    ...formErrors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [e.target.name]: err.errors[0]
                });
            });

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return [values, handleChanges, formErrors];
}