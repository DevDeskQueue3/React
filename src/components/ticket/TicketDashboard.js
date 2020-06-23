import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as MUI from '../../MaterialUI/';
import { setLoggedUserRole } from '../../actions/tickets';

import './ticket.css';
import NavDrawer from './NavDrawer';
import TicketQueue from './TicketQueue';
import TicketPreview from './TicketPreview';

const TicketDashboard = props => {
    const [ticket, setTicket] = useState({});
    const [previewVisible, setPreviewVisible] = useState(false);
    const [statusText, setStatusText] = useState("Tickets");
    const [open, setOpen] = useState();

    const classes = MUI.useStyles();

    const setVisible = (t) => {
        setTicket(t);
        if(!previewVisible){
            setPreviewVisible(!previewVisible);
        }
    };

    useEffect(() => {
        console.log(open);
    },[open]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const updateStatusText = (stat) => {
        setStatusText(stat);
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
            <NavDrawer
                updateStatusText={updateStatusText}
                open={open} />
            <TicketQueue
                showPreview={setVisible}
                statusText={statusText}
                toggleDrawer={toggleDrawer}
            />
            <TicketPreview visible={previewVisible} ticket={ticket} />
        </div>

        
    );
};

export default TicketDashboard;