import React, { useEffect, useState } from 'react';
import * as MUI from "../../MaterialUI";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { getTickets, toggleClaim } from '../../actions/tickets';
import { useHistory } from 'react-router-dom';

import Burger from '../burger/Burger';
import DottedMenu from '../burger/Dotted';
import TicketForm from './TicketForm';
import useWindowSize from '../../hooks/useWindowSize';

import { setStatusColor } from '../../utils/setStatusColor';
import { theme } from "../../MaterialUI/useStyles";


const TicketQueue = (props) => {
    const classes = MUI.useStyles();
    const dispatch = useDispatch();
    const { push } = useHistory();

    const { user } = useSelector(state => state.login);
    const { tickets, loggedUserRole, isFetching, error } = useSelector(state => state.tickets);
    const [filteredTickets, setFilteredTickets] = useState(tickets);
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        dispatch(getTickets());        
    }, [dispatch, props.isCreatingTicket]);

    useEffect(() => {
        // let newTickets = tickets.filter(ticket => ticket.status === "OPEN");
        console.log(filteredTickets);
    }, [filteredTickets]);

    useEffect(() => {
        if(loggedUserRole === "STUDENT"){
            setFilteredTickets(tickets.filter(ticket => ticket.posted_by_id === user.id));
        } else {
            setFilteredTickets(tickets)
        }

        if(props.filter !== ''){
            if(loggedUserRole === "HELPER"){
                setFilteredTickets(tickets.filter(ticket => 
                        (
                            (
                                (props.filter === "ALL" ? ticket : ticket.claimed_by_id === user.id ||
                                ticket.status === props.filter) ||
                                (ticket.categories !== null && ticket.categories.includes(props.filter))
                            )
                        )
                    )
                );
            } else {
                setFilteredTickets(tickets.filter(ticket => 
                        (
                            ticket.posted_by_id === user.id && 
                            (
                                ticket.status === props.filter ||
                                (ticket.categories !== null && ticket.categories.includes(props.filter))
                            )
                        )
                    )
                );
            }
        }

    }, [loggedUserRole, user, props.filter, tickets, dispatch]);

    // if(filteredTickets.length > 0) console.log("FilteredTickets: ", filteredTickets);

    const loginAgain = e => {
        localStorage.removeItem("devdesk-auth");
        localStorage.removeItem("user");
        push("/student/login");
    }

    const toggleTicket = (e) => {
        e.currentTarget.classList.toggle('expand');
    };

    if(props.isCreatingTicket) return <TicketForm showPreview={props.showPreview} setPreviewVisible={props.setPreviewVisible} toggleDrawer={props.toggleDrawer} open={props.open} setIsCreatingTicket={props.setIsCreatingTicket} />;

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
                        let daysAgo = moment(ticket.posted_at, "YYYYMMDD").fromNow();
                        
                        return( 
                            <MUI.Card
                                onClick={(e) => {
                                    if (windowWidth < 1100) toggleTicket(e, ticket);
                                    if (windowWidth > 1100) props.showPreview(ticket);
                                }}
                                className={`${classes.card} ${setStatusColor("TICKET", ticket.status)}`} 
                                key={ticket.ticket_id}>
                                <div className={classes.details}>
                                    {loggedUserRole === "HELPER" && (
                                        <section className={classes.cardsection}>
                                            <MUI.CardContent
                                                className={classes.timeframe}>
                                                <div className='timeframe-text'>
                                                    <p>{daysAgo}</p>
                                                </div>
                                            </MUI.CardContent>
                                        </section>
                                    )}
                                    <div className='ticket-info-wrapper'>
                                        <section className={classes.cardsection}>
                                            <p className={classes.subtitle}>{ticket.categories} Issue</p>
                                            <MUI.CardHeader
                                                className={classes.header}
                                                title={ticket.title} />    
                                            <section className='additional-info'>
                                                <h5>Description of Issue</h5>
                                                <MUI.Typography>{ticket.description}</MUI.Typography>
                                                <h5>What I've tried</h5>
                                                <MUI.Typography>{ticket.what_ive_tried}</MUI.Typography>
                                            </section>                                        
                                        </section>
                                        <section className={classes.cardsection} style = {{textAlign: "right"}}>
                                            <MUI.CardContent>
                                                {(loggedUserRole === "HELPER" && ticket.claimed_by_name) &&
                                                    <>
                                                        <MUI.IconButton>
                                                            <MUI.Tooltip
                                                                disableHoverListener={ticket.claimed_by_name === null ? true : false}
                                                                className={classes.tooltip}
                                                                title={<MUI.Typography>{ticket.claimed_by_name && ticket.claimed_by_name}</MUI.Typography>}
                                                            >
                                                                <MUI.AccountCircle />
                                                            </MUI.Tooltip>
                                                        </MUI.IconButton>
                                                        <br />
                                                    </>
                                                }
                                                <MUI.ThemeProvider theme = {theme}>
                                                    {(loggedUserRole === "HELPER" && ticket.status === "OPEN") && <>
                                                        <br />
                                                        <MUI.Button 
                                                            variant = "outlined" 
                                                            color = "primary" 
                                                            disabled = {
                                                                (ticket.claimed_by_id && ticket.claimed_by_id !== user.id) ? true : false}
                                                            onClick = {e => {
                                                                e.stopPropagation();
                                                                props.setPreviewVisible(false);
                                                                dispatch(toggleClaim(ticket));
                                                            }}
                                                        >
                                                            {
                                                                (ticket.claimed_by_id && ticket.claimed_by_id !== user.id) ? "Claimed" : 
                                                                (ticket.claimed_by_id && ticket.claimed_by_id === user.id) ? "Unclaim" : "Claim"}
                                                        </MUI.Button>
                                                    </>}
                                                </MUI.ThemeProvider>

                                                {loggedUserRole === "STUDENT" && <>
                                                    
                                                    <DottedMenu 
                                                        ticket = {ticket} 
                                                        setIsCreatingTicket = {props.setIsCreatingTicket}
                                                        setTicketToEdit = {props.setTicketToEdit}
                                                        setPreviewVisible = {props.setPreviewVisible}
                                                    />
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
                    onClick = {() => props.setIsCreatingTicket(true)}
                >
                    <MUI.AddTicketIcon fontSize="large" />
                </MUI.Button>
            }
        </MUI.List>

    );
};

export default TicketQueue;