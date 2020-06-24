import React from 'react';
import * as MUI from '../../MaterialUI';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusColor } from '../../utils/setStatusColor';
import DottedMenu from '../burger/Dotted';
import { theme } from '../../MaterialUI/useStyles';
import { toggleClaim } from '../../actions/tickets';

// Needs to hide at 1100px window width and below, 
// then make the tickets in the queue expand when you 
// click on them when the preview is not visible
// Check NavDrawer component for comment on when to hide
const TicketPreview = (props) => {
    const classes = MUI.useStyles();
    const dispatch = useDispatch();
    const { loggedUserRole } = useSelector(state => state.tickets);
    const { user } = useSelector(state => state.login);

    // Should be fixed position so it always shows when scrolling page
    return (
        <div id = "rightPane" className={classes.rightPane}>
            {!props.visible && <h2 className = {classes.previewHelperText}>Ticket Preview, Select a ticket to view details.</h2>}
            <MUI.Card className={props.visible ? `${classes.drawerVisible} ${classes.previewDrawer} ${setStatusColor("PREVIEW", props.ticket.status)}` : `${classes.previewDrawer} ${setStatusColor("PREVIEW", props.ticket.status)}`}>
                <MUI.CardHeader
                    title={
                        <MUI.Typography
                            component='h3'
                            variant='h3'
                        >
                            {props.isCreatingTicket ? `Title: ${props.ticket.title}` : props.ticket.title}

                            <MUI.ThemeProvider theme = {theme}>
                                {(loggedUserRole === "HELPER" && props.ticket.status === "OPEN") && <>
                                    <br />
                                    <MUI.Button 
                                        variant = "outlined" 
                                        color = "primary" 
                                        disabled = {
                                            (props.ticket.claimed_by_id && props.ticket.claimed_by_id !== user.id) ? true : false}
                                        onClick = {e => {
                                            e.stopPropagation();
                                            props.setPreviewVisible(false);
                                            dispatch(toggleClaim(props.ticket));
                                        }}
                                    >
                                        {
                                            (props.ticket.claimed_by_id && props.ticket.claimed_by_id !== user.id) ? "Claimed" : 
                                            (props.ticket.claimed_by_id && props.ticket.claimed_by_id === user.id) ? "Unclaim" : "Claim"}
                                    </MUI.Button>
                                </>}
                            </MUI.ThemeProvider>


                            {loggedUserRole === "STUDENT" && <>
                                
                                <DottedMenu 
                                    ticket = {props.ticket} 
                                    setIsCreatingTicket = {props.setIsCreatingTicket}
                                    setPreviewVisible = {props.setPreviewVisible}
                                />
                            </>}
                        </MUI.Typography>
                    }
                    subheader={
                        <p className={classes.subtitle}>{props.ticket.categories} Issue</p>
                    }>
                </MUI.CardHeader>
                <MUI.CardContent>
                    <MUI.Typography
                                component='h4'
                                variant='h4'
                            >
                        Description of issue
                    </MUI.Typography>
                </MUI.CardContent>
                <MUI.CardContent>
                    <MUI.Typography>
                        {props.ticket.description}
                    </MUI.Typography>
                </MUI.CardContent>
                <MUI.CardContent>
                    <MUI.Typography
                                component='h4'
                                variant='h4'
                            >
                        What I've tried
                    </MUI.Typography>
                </MUI.CardContent>
                <MUI.CardContent>
                    <MUI.Typography>
                    {props.ticket.what_ive_tried}
                    </MUI.Typography>
                </MUI.CardContent>
            </MUI.Card>
        </div>
    );
};

export default TicketPreview;