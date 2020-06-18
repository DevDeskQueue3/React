import React from 'react';

import { Container } from '@material-ui/core';

import useForm from '../../hooks/useForm';

import { registerFormSchema } from '../../utils/loginFormValidation';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const StudentRegister = () => {
    const [values, handleChanges, formErrors] = useForm(initialValues, registerFormSchema);

    //Note: onSubmit, when creating the new state data, don't forget to add the student role
    // and concatenate the names
    
    return (
        <>
            <Container fixed>
            </Container>
        </>
    );
};

export default StudentRegister;