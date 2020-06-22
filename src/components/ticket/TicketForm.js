import React, { useState } from 'react';

import useForm from '../../hooks/useForm';
import * as MUI from '../../MaterialUI/index';
import { ticketFormSchema } from '../../utils/ticketFormValidation';
import { theme } from '../../MaterialUI/useStyles';

const initialValues = {
    title: '',

};

const TicketForm = () => {
    const classes = MUI.useStyles();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [values, handleChanges, formErrors] = useForm(initialValues, ticketFormSchema);

    return(
        <>
            <div className='ticket-form-container'>
                <section className='ticket-form-header'>
                    <h1>Let's submit a help ticket.</h1>
                    <p>Required Fields</p>
                </section>
                <section className='ticket-form'>
                    <form>
                        <MUI.ThemeProvider theme={theme}>
                            <div className='input-group'>
                                <MUI.TextField
                                    id='title'
                                    type='text'
                                    value={values.title}
                                    onChange={handleChanges}
                                    label="What's going on?"
                                />
                            </div>
                            <div className='input-group'>
                                <MUI.InputLabel
                                    htmlFor='topic'>What is the issue about?</MUI.InputLabel>
                                <MUI.Chip
                                    label='Equipment'
                                    variant='outlined'
                                    clickable
                                />
                                <MUI.Chip
                                    label='People'
                                    variant='outlined'
                                    clickable
                                />
                                <MUI.Chip
                                    label='Track'
                                    variant='outlined'
                                    clickable
                                />
                                <MUI.Chip
                                    label='Finances'
                                    variant='outlined'
                                    clickable
                                />
                                <MUI.Chip
                                    label='Other'
                                    variant='outlined'
                                    clickable
                                />
                            </div>
                            <div className='input-group'>
                                <MUI.TextField
                                    id='efforts'
                                    type='text'
                                    value={values.efforts}
                                    onChange={handleChanges}
                                    label='What have you tried?'
                                />
                            </div>
                            <div className='input-group'>
                                <MUI.TextField
                                    id='comments'
                                    type='text'
                                    value={values.efforts}
                                    onChange={handleChanges}
                                    label='Anything else we should know?'
                                />
                            </div>
                        </MUI.ThemeProvider>
                        <div className = "button-group">
                            <MUI.Button className = {classes.colorButton} size="large" color="primary" type = "submit" disabled={buttonDisabled}>Submit Ticket</MUI.Button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default TicketForm;