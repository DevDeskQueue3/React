import * as yup from 'yup';

export const ticketFormSchema = yup.object().shape({
    title: yup.string().required('Title is a required field')
});