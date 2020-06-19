import React from 'react';
import { useSelector } from "react-redux";
import * as MUI from '../../MaterialUI/index';

const TicketDashboard = props => {
    const classes = MUI.useStyles();

    // Tickets State has hardcoded data for use while building the component
    const { user } = useSelector(state => state.login);
    const { tickets, isFetching, error } = useSelector(state => state.tickets);

    console.log("cea: components/ticket/TicketDashBoard.js: user: ", user);
    console.log("cea: components/ticket/TicketDashBoard.js: tickets: ", tickets);

    return(
        <>
            <MUI.Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
                variant='permanent'
                anchor='left'
            >
                <MUI.List>
                    <MUI.ListItem>The Queue</MUI.ListItem>
                </MUI.List>
                <MUI.Divider />
                <MUI.List>
                    <MUI.ListItem button>All Tickets</MUI.ListItem>
                </MUI.List>
                <MUI.Divider />
                <MUI.List>
                    <MUI.ListItem button>My Tickets</MUI.ListItem>
                </MUI.List>
                <MUI.Divider />
                <MUI.TreeView
                    className={classes.root}
                    defaultCollapseIcon={<MUI.ExpandMoreIcon />}
                    defaultExpandIcon={<MUI.ChevronRightIcon />}
                >
                    
                </MUI.TreeView>
            </MUI.Drawer>
        </>
    );
};

export default TicketDashboard;