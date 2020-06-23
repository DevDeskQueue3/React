import * as yup from 'yup';

export const ticketFormSchema = yup.object().shape({
    title: yup.string().required('Please enter a title'),
    categories: yup.string().required(),
    what_ive_tried: yup.string(),
    description: yup.string().required("Please enter a description of the issue you are having"),
});