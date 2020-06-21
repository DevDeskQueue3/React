import React from 'react';
import * as MUI from '../../MaterialUI';


// Needs to hide at 1100px window width and below, 
// then make the tickets in the queue expand when you 
// click on them when the preview is not visible
// Check NavDrawer component for comment on when to hide
const TicketPreview = () => {
    const classes = MUI.useStyles();

    // Should be fixed position so it always shows when scrolling page
    return (
        <div className = {classes.previewDrawer}>

            <h3>Ticket Preview goes here</h3>

        </div>
    );
};

export default TicketPreview;