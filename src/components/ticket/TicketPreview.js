import React, { useEffect, useState } from 'react';
import * as MUI from '../../MaterialUI';
import { useSelector } from 'react-redux';

// Needs to hide at 1100px window width and below, 
// then make the tickets in the queue expand when you 
// click on them when the preview is not visible
// Check NavDrawer component for comment on when to hide
const TicketPreview = (props) => {
    const classes = MUI.useStyles();
    const { loggedUserRole } = useSelector(state => state.tickets);
    const [anchorEl, setAnchorEl] = useState();

    useEffect(() => {
        console.log('ticket preview: ', props.visible);
    },[props.visible]);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = e => {
        setAnchorEl(null);
    };

    // Should be fixed position so it always shows when scrolling page
    return (
        <div id = "rightPane" className={classes.rightPane}>
            {!props.visible && <h2 className = {classes.previewHelperText}>Ticket Preview, Select a ticket to view details.</h2>}
            <MUI.Card className={props.visible ? `${classes.drawerVisible} ${classes.previewDrawer}` : classes.previewDrawer}>
                <MUI.CardHeader
                    title={
                        <MUI.Typography
                            component='h3'
                            variant='h3'
                        >
                            Title: {props.ticket.title}
                            <MUI.IconButton onClick={handleClick}>
                                <MUI.MoreVertIcon />
                            </MUI.IconButton>
                            <MUI.Menu
                                id='option-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MUI.MenuItem onClick={handleClose}>Edit</MUI.MenuItem>
                                <MUI.MenuItem onClick={handleClose}>Delete</MUI.MenuItem>
                                <MUI.MenuItem onClick={handleClose}>Update Status</MUI.MenuItem>
                            </MUI.Menu>
                        </MUI.Typography>
                    }
                    subheader={
                        <p className={classes.subtitle}>Category: {props.ticket.categories}</p>
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
                <MUI.CardContent>
                    {loggedUserRole === "HELPER" && <MUI.Button variant = "contained" >Assign</MUI.Button>}{" "}
                    {loggedUserRole === "STUDENT" && <>
                        <MUI.Button variant = "contained">Edit</MUI.Button>{" "}
                        <MUI.Button variant = "contained">Delete</MUI.Button>{" "}
                    </>}
                </MUI.CardContent>
            </MUI.Card>
        </div>
    );
};

export default TicketPreview;