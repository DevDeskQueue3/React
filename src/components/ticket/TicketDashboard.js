import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as MUI from '../../MaterialUI/';
import { setLoggedUserRole } from '../../actions/tickets';

import './ticket.css';
import NavDrawer from './NavDrawer';
import TicketQueue from './TicketQueue';
import TicketPreview from './TicketPreview';
import useWindowSize from '../../hooks/useWindowSize';

const TicketDashboard = props => {
    const [ticket, setTicket] = useState({});
    const [previewVisible, setPreviewVisible] = useState(false);
    const [statusText, setStatusText] = useState("All Tickets");
    const [statusFilter, setStatusFilter] = useState("");
    const [open, setOpen] = useState(true);
    const [windowWidth] = useWindowSize();
    const [setter, setSetter] = useState();
    const classes = MUI.useStyles();

    useEffect(() => {
        if(windowWidth) {
            if(windowWidth < 600) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        }
    }, [windowWidth])

    const setVisible = (t) => {
        setTicket(t);
        if(!previewVisible){
            setPreviewVisible(!previewVisible);
        }
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const updateStatusText = (stat) => {
        setStatusText(stat);
    };

    useEffect(() => {
        console.log(statusFilter);
    },[statusFilter]);

    const filterTickets = (status) => {
        setStatusFilter(status);
    };

    const getTicketSetter = (setter) => {
        setSetter(setter);
        console.log(setter);
    };

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setLoggedUserRole(localStorage.getItem("loggedUserRole")));
    }, [dispatch]);

    return(
        <div className = {classes.dashboardRoot}>
            <NavDrawer
                updateStatusText={updateStatusText}
                filterTickets={filterTickets}
                open={open} />
            <TicketQueue
                showPreview={setVisible}
                statusText={statusText}
                filter={statusFilter}
                ticketToUpdate={ticket}
                getTicketSetter={getTicketSetter}
                toggleDrawer={toggleDrawer}
                open = {open}
                setPreviewVisible = {setPreviewVisible}
            />
            <TicketPreview
                visible={previewVisible}
                ticket={ticket} />
        </div>

        
    );
};

export default TicketDashboard;