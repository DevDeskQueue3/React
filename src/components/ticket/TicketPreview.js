import React, { useState, useEffect } from 'react';
import * as MUI from '../../MaterialUI';

// Needs to hide at 1100px window width and below, 
// then make the tickets in the queue expand when you 
// click on them when the preview is not visible
// Check NavDrawer component for comment on when to hide
const TicketPreview = (props) => {
    const classes = MUI.useStyles();

    useEffect(() => {
        console.log('ticket preview: ', props.visible);
    },[props.visible]);

    // Should be fixed position so it always shows when scrolling page
    return (
        <div className={props.visible ? `${classes.drawerVisible} ${classes.previewDrawer}` : classes.previewDrawer}>
            <MUI.Card>
                <MUI.CardHeader
                    title={
                        <MUI.Typography
                            component='h3'
                            variant='h3'
                        >
                            People Issue
                        </MUI.Typography>
                    }
                    subheader={
                        <p className={classes.subtitle}>My team isn't communicating well</p>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut lacinia velit, nec ultrices nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sit amet libero sapien. Sed vulputate ante lacus, non viverra lacus finibus.
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
                        Meeting individually with my TL and SL.
                    </MUI.Typography>
                </MUI.CardContent>
            </MUI.Card>
        </div>
    );
};

export default TicketPreview;