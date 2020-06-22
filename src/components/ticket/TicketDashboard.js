import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as MUI from '../../MaterialUI/';
import { getTickets, setLoggedUserRole } from '../../actions/tickets';

import './ticket.css';
import NavDrawer from './NavDrawer';
import TicketQueue from './TicketQueue';
import TicketPreview from './TicketPreview';

const TicketDashboard = props => {
    const [ticket, setTicket] = useState({});
    const [previewVisible, setPreviewVisible] = useState(false);
    const classes = MUI.useStyles();

    const setVisible = (t) => {
        setTicket(t);
        if(!previewVisible){
            setPreviewVisible(!previewVisible);
        }
    };

    // Tickets State has hardcoded data for use while building the component
    const { user } = useSelector(state => state.login);
    const dispatch = useDispatch();

    console.log("cea: components/ticket/TicketDashBoard.js: user: ", user);
    

    useEffect(() => {
        dispatch(setLoggedUserRole(localStorage.getItem("loggedUserRole")));
    }, [dispatch]);

    return(
        <div className = {classes.dashboardRoot}>
            <NavDrawer />
            <TicketQueue showPreview = {setVisible} />
            <TicketPreview visible={previewVisible} ticket={ticket} />
        </div>

        
    );
};

export default TicketDashboard;

{/* <MUI.Grid container className={classes.dashboardRoot} spacing={1} >
            <NavDrawer />
            <TicketQueue showPreview={setVisible} />
            <TicketPreview visible={previewVisible} ticket={ticket} />
        </MUI.Grid> */}