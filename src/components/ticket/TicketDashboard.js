import React from 'react';
import { useSelector } from "react-redux";

const TicketDashboard = props => {

    // Tickets State has hardcoded data for use while building the component
    const { user } = useSelector(state => state.login);
    const { tickets, isFetching, error } = useSelector(state => state.tickets);

    console.log("cea: components/ticket/TicketDashBoard.js: user: ", user);
    console.log("cea: components/ticket/TicketDashBoard.js: tickets: ", tickets);

    return(
        <>
            <h1>TicketDashboard</h1>
        </>
    );
};

export default TicketDashboard;