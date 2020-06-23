import React, { useState, useEffect } from 'react';

import useForm from '../../hooks/useForm';
import * as MUI from '../../MaterialUI/index';
import { ticketFormSchema } from '../../utils/ticketFormValidation';
import { theme, ColorButton } from '../../MaterialUI/useStyles';
import { useDispatch } from "react-redux";
import { createTicket } from '../../actions/tickets';
import Burger from '../burger/Burger';
import useWindowSize from '../../hooks/useWindowSize';

const initialValues = {
    title: "",
    description: "",
    categories: [],
    what_ive_tried: "",
};

const TicketForm = props => {
    const dispatch = useDispatch();
    const [windowWidth] = useWindowSize();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [values, handleChanges, formErrors, clearForm] = useForm(initialValues, ticketFormSchema);
    const [chipData, setChipData] = useState([
        {key: 0, name: "categories", value: "Equipment"},
        {key: 1, name: "categories", value: "People"},
        {key: 2, name: "categories", value: "Track"},
        {key: 3, name: "categories", value: "Finances"},
        {key: 4, name: "categories", value: "Other"},
    ]);

    useEffect(() => {
        ticketFormSchema.isValid(values).then((valid) => {
            setButtonDisabled(!valid);
        });
    },[values]);

    useEffect(() => props.showPreview(values), [values]);

    const selectTopic = data => {
        console.log(data.name, data.value);

        if(!data.selected) {
            document.querySelectorAll(".selected").forEach(selected => selected.classList.remove("selected"));
            setChipData(chipData.map(chip => {
                if(chip.selected) {
                    delete chip.selected;
                    return chip;
                }
                return chip;
            }));
        }
        setChipData(chipData.map(chip => {
            if(chip.key === data.key) {
                return {
                    ...chip,
                    selected: true
                }
            }
            return chip;
        }));

        handleChanges({target: {name: data.name, value: data.value}});
    }
    
    const submitTicket = e => {
        e.preventDefault();
        console.log(values)
        dispatch(createTicket(values));
        props.setIsCreatingTicket(false);
        clearForm();
    }
    return(
        <div className='ticket-form-container ticket-list'>
            <section className='ticket-form-header'>
                {windowWidth < 600 && <Burger toggleDrawer={props.toggleDrawer} />}
                <h2>Let's submit a help ticket.</h2>
                {/* <p><span>*</span> Required Fields</p> */}
                <MUI.IconButton aria-label = "close" onClick = {() => {
                    props.setIsCreatingTicket(false);
                    props.setPreviewVisible(false);
                }}>
                    <MUI.CancelIcon fontSize="large" />
                </MUI.IconButton>
            </section>
            <section className='ticket-form'>
                <form onSubmit = {submitTicket}>
                    <MUI.ThemeProvider theme={theme}>
                        <div className='input-group'>
                            <MUI.TextField
                                error = {formErrors.title.length > 0} 
                                helperText = {formErrors.title.length > 0 && formErrors.title}
                                id='title'
                                name = "title"
                                type='text'
                                value={values.title}
                                onChange={handleChanges}
                                label={`What's going on? ${(<span>*</span>).props.children}`}
                            /><br />
                        </div>
                        <div className='input-group'>
                            <MUI.InputLabel
                                htmlFor='topic'>What is the issue about? <span style = {{color: "red"}}>(Required)</span></MUI.InputLabel>
                            {chipData.map(data => {
                                return (
                                    <MUI.Chip 
                                        key = {data.key}
                                        label = {data.value}
                                        onClick = {() => selectTopic(data)}
                                        className = {data.selected && "selected"}
                                        variant = "outlined"
                                    />
                                );
                            })}
                        </div>
                        <div className='input-group'>
                            <MUI.TextField
                                error = {formErrors.description.length > 0} 
                                helperText = {formErrors.description.length > 0 && formErrors.description}
                                multiline
                                rowsMax = {8}
                                variant = "outlined"
                                id='description'
                                type='text'
                                name="description"
                                value={values.description}
                                onChange={handleChanges}
                                label={`Describe your issue ${(<span>*</span>).props.children}`}
                            /><br />
                        </div>
                        <div className='input-group'>
                            <MUI.TextField    
                                multiline
                                rowsMax = {8}
                                variant = "outlined"                        
                                id='efforts'
                                name = "what_ive_tried"
                                type='text'
                                value={values.steps_tried}
                                onChange={handleChanges}
                                label='What have you tried?'
                            />
                        </div>
                        
                    </MUI.ThemeProvider>
                    <div className = "button-group">
                        <ColorButton size="large" color="primary" type = "submit" disabled={buttonDisabled}>Submit Ticket</ColorButton>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default TicketForm;