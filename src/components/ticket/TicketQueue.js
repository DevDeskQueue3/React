import React, { useEffect, useState } from 'react';
import * as MUI from "../../MaterialUI";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, deleteTicket } from '../../actions/tickets';
import { useHistory } from 'react-router-dom';

import Burger from '../burger/Burger';
import TicketForm from './TicketForm';
import useWindowSize from '../../hooks/useWindowSize';

const TicketQueue = (props) => {
    const classes = MUI.useStyles();
    const dispatch = useDispatch();
    const { push } = useHistory();

    const { user } = useSelector(state => state.login);
    const { tickets, loggedUserRole, isFetching, error } = useSelector(state => state.tickets);
    const [filteredTickets, setFilteredTickets] = useState(tickets);
    const [isCreatingTicket, setIsCreatingTicket] = useState(false);
    const [ticketToEdit, setTicketToEdit] = useState(null);
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        dispatch(getTickets());        
    }, [dispatch, isCreatingTicket]);

    useEffect(() => {
        if(loggedUserRole === "STUDENT"){
            setFilteredTickets(tickets.filter(ticket => ticket.posted_by_id === user.id));
        } else {
            setFilteredTickets(tickets)
        }

        if(props.filter !== ''){
            setFilteredTickets(tickets.filter(ticket => (ticket.posted_by_id === user.id && ticket.status === props.filter)));
        }

    }, [loggedUserRole, user, props.filter, tickets, dispatch]);

    if(filteredTickets.length > 0) console.log("FilteredTickets: ", filteredTickets);

    const loginAgain = e => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        push("/student/login");
    }

    /* Helper function to set ticket status color */
    const setStatusColor = (status) => {
        let colorClass = "";

        /* Set the ticket status color according to the ticket status */
        switch(status){
            case "OPEN":
                colorClass = "ticket-card-red";
                break;
            case "CLOSED":
                colorClass = "ticket-card-green";
                break;
            case "RESOLVED":
                colorClass = "ticket-card-purple";
                break;
            default:
                break;
        };

        return colorClass;
    };

    if(isCreatingTicket) return <TicketForm ticketToEdit = {ticketToEdit} setTicketToEdit = {setTicketToEdit} showPreview={props.showPreview} setPreviewVisible={props.setPreviewVisible} toggleDrawer={props.toggleDrawer} open={props.open} setIsCreatingTicket={setIsCreatingTicket} />;
    return (
        <MUI.List className="ticket-list" >
            <section className='ticket-list-header'>
                {windowWidth < 600 && <Burger toggleDrawer={props.toggleDrawer} open={props.open} />}
                <h2>{props.statusText}</h2>
            </section>
            {
                isFetching ? <h3 className='loading'>Loading Tickets...</h3> : 
            error.code === 401 ? <h3>Your session has expired. Please <MUI.Button variant = "contained" onClick = {loginAgain}>Log In</MUI.Button> Again</h3> :
            filteredTickets.length === 0 ? <h3>You do not have any tickets yet.</h3> :
                (
                    
                    filteredTickets.map((ticket) => {
                        
                        return( 
                            <MUI.Card
                                onClick={() => props.showPreview(ticket)}
                                className={`${classes.card} ${setStatusColor(ticket.status)}`} 
                                key={ticket.ticket_id}>
                                <div className={classes.details}>
                                    <section className={classes.cardsection}>
                                        <MUI.CardContent
                                            className={classes.timeframe}>
                                            <p>1 Day Old</p>
                                        </MUI.CardContent>
                                    </section>
                                    <div className='ticket-info-wrapper'>
                                        <section className={classes.cardsection}>
                                            <MUI.CardHeader
                                                className={classes.header}
                                                title={ticket.title} />
                                            <p className={classes.subtitle}>{ticket.categories}</p>
                                        </section>
                                        <section className={classes.cardsection}>
                                            <MUI.CardContent>
                                                {loggedUserRole === "HELPER" && <><br /><MUI.Button variant = "contained" >Assign</MUI.Button></>}
                                                {loggedUserRole === "STUDENT" && <>
                                                    <MUI.IconButton>
                                                        <MUI.Tooltip
                                                            className={classes.tooltip}
                                                            viewbox='0 0 50px 50px'
                                                            title={<MUI.Typography>{ticket.posted_by_name}</MUI.Typography>}
                                                        >
                                                            <MUI.AccountCircle />
                                                        </MUI.Tooltip>
                                                    </MUI.IconButton>

                                                    <MUI.IconButton onClick = {() => {
                                                        setIsCreatingTicket(true);
                                                        setTicketToEdit(ticket);
                                                    }}>
                                                        <MUI.EditIcon />
                                                    </MUI.IconButton>
                                                    <MUI.IconButton onClick = {() => {
                                                        dispatch(deleteTicket(ticket.ticket_id));
                                                        props.setPreviewVisible(false);
                                                    }}>
                                                        <MUI.DeleteIcon />
                                                    </MUI.IconButton>
                                                </>}
                                            </MUI.CardContent>
                                        </section>
                                    </div>
                                </div>
                            </MUI.Card>
                        );
                    })
                )
            }
            
            {loggedUserRole === "STUDENT" && 
                <MUI.Button
                    id = "addTicketButton"
                    className={classes.addTicketButton}
                    variant="contained"
                    onClick = {() => setIsCreatingTicket(true)}
                >
                    <MUI.AddTicketIcon fontSize="large" />
                </MUI.Button>
            }
        </MUI.List>

    );
};

export default TicketQueue;