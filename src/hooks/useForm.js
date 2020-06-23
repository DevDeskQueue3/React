import { useState } from "react";
import * as yup from "yup";

const initialValues = {
    title: "",
    description: "",
    categories: [],
    what_ive_tried: "",
};

export default function useForm(passedValues, formSchema) {
    const [values, setValues] = useState(passedValues);
    const [formErrors, setFormErrors] = useState(initialValues);

    const handleChanges = e => {
        if(e.target.name !== "categories") e.persist();
        
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
            [e.target.name]: e.target.name === "categories" ? [e.target.value] : e.target.value
        });
    }

    const clearForm = () => {
        setValues(initialValues);
    }

    return [values, handleChanges, formErrors, clearForm];
}