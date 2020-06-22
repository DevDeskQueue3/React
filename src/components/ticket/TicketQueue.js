import React, { useEffect } from 'react';
import * as MUI from "../../MaterialUI";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from '../../actions/tickets';
import { useHistory } from 'react-router-dom';

const TicketQueue = (props) => {
    const classes = MUI.useStyles();
    const dispatch = useDispatch();
    const { push } = useHistory();

    const { tickets, isFetching, error } = useSelector(state => state.tickets);

    console.log("cea: components/ticket/TicketDashBoard.js: tickets: ", tickets);

    useEffect(() => dispatch(getTickets()), [dispatch]);

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
            case "INPROGRESS":
                colorClass = "ticket-card-purple";
                break;
            default:
                break;
        };

        return colorClass;
    };

    return (
        <MUI.List className={classes.ticketList} >
            {
                isFetching ? <h3 className='loading'>Loading Tickets...</h3> : 
            error.code === 401 ? <h3>Your session has expired. Please <MUI.Button variant = "contained" onClick = {loginAgain}>Log In</MUI.Button> Again</h3> :
                (
                    tickets.map((ticket) => {
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
                                            <p className={classes.subtitle}>{ticket.description}</p>
                                        </section>
                                        <section className={classes.cardsection}>
                                            <MUI.CardContent>
                                                <MUI.Tooltip
                                                    className={classes.tooltip}
                                                    TransitionComponent={MUI.Fade}
                                                    title={ticket.posted_by_name}>
                                                    <MUI.AccountCircle />
                                                </MUI.Tooltip>
                                            </MUI.CardContent>
                                        </section>
                                    </div>
                                </div>
                            </MUI.Card>
                        );
                    })
                )
            }
            
            <MUI.Button
                id = "addTicketButton"
                className={classes.addTicketButton}
                variant="contained"
            >
                <MUI.AddTicketIcon fontSize="large" />
            </MUI.Button>
        </MUI.List>

    );
};

export default TicketQueue;