import React, { useState } from 'react';
import * as MUI from '../../MaterialUI/index';
import { useDispatch } from 'react-redux';
import { deleteTicket, changeStatus, setTicketToEdit } from '../../actions/tickets';

const DottedMenu = ({ticket, setIsCreatingTicket, setPreviewVisible}) => {
    //const classes = MUI.useStyles();
    const [anchorEl, setAnchorEl] = useState();
    const dispatch = useDispatch();
    
    const handleClick = e => {
        setAnchorEl(e.target);
    };

    const handleClose = e => {
        setAnchorEl(null);
    };

    return (<>
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
            {ticket.status === "OPEN" && (
                <MUI.MenuItem onClick={() => {
                    handleClose();
                    setIsCreatingTicket(true);
                    dispatch(setTicketToEdit(ticket));
                }}>Edit Details</MUI.MenuItem>
            )}
                <MUI.MenuItem onClick={() => {
                        handleClose()
                        dispatch(deleteTicket(ticket.ticket_id));
                        setPreviewVisible(false);
                    }
                }>Delete Ticket</MUI.MenuItem>
            
            {ticket.status !== "CLOSED" && (
                <MUI.MenuItem onClick={() => {
                    handleClose();
                    dispatch(changeStatus(
                            ticket.ticket_id, 
                            ticket.status === "OPEN" ? "resolve" : 
                            ticket.status === "RESOLVED" && "open"
                        )
                    );
                    setPreviewVisible(false);
                }}>
                    {ticket.status === "OPEN" ? "Mark Resolved" : 
                    ticket.status === "RESOLVED" && "Mark Unresolved"}
                </MUI.MenuItem>
            )}

            {(ticket.status === "RESOLVED" || ticket.status === "CLOSED") && (
                <MUI.MenuItem onClick={() => {
                    handleClose();
                    dispatch(changeStatus(
                        ticket.ticket_id, 
                        ticket.status === "RESOLVED" ? "close" : 
                        ticket.status === "CLOSED" && "open")
                    );
                    setPreviewVisible(false);
                }}>{ticket.status === "RESOLVED" ? "Close Ticket" : ticket.status === "CLOSED" && "Reopen Ticket"}</MUI.MenuItem>
            )}
        </MUI.Menu>
    </>);
};

export default DottedMenu;