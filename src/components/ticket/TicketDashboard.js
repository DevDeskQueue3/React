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
            <MUI.Grid
                container
                spacing={1}>
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
                        <MUI.TreeItem nodeId='1' label='Filter Tickets'>
                            <MUI.TreeItem nodeId='2' label='Categories'>
                                <MUI.TreeItem nodeId='3' label='Category 1' />
                            </MUI.TreeItem>
                            <MUI.TreeItem nodeId='4' label='Status'>
                                <MUI.TreeItem nodeId='5' label='Created' />
                                <MUI.TreeItem nodeId='6' label='Viewed' />
                                <MUI.TreeItem nodeId='7' label='In Progress' />
                                <MUI.TreeItem nodeId='8' label='Completed' />
                            </MUI.TreeItem>
                            <MUI.TreeItem nodeId='9' label='Assigned to'>
                                <MUI.TreeItem nodeId='10' label='Team Lead' />
                                <MUI.TreeItem nodeId='11' label='Section Lead' />
                            </MUI.TreeItem>
                            <MUI.TreeItem nodeId='12' label='Urgency'>
                                <MUI.TreeItem nodeId='13' label='Normal' />
                                <MUI.TreeItem nodeId='14' label='Urgent' />
                                <MUI.TreeItem nodeId='15' label='Very Urgent' />
                                <MUI.TreeItem nodeId='16' label='Emergency' />
                            </MUI.TreeItem>
                        </MUI.TreeItem>
                    </MUI.TreeView>
                </MUI.Drawer>
                <MUI.List className='ticket-list'>
                    {tickets.map((ticket) => {
                        return( 
                            <MUI.Card key={ticket.id}>
                                <div className={classes.details}>
                                    <MUI.CardContent>
                                        ddd
                                    </MUI.CardContent>
                                    <MUI.CardHeader
                                        title={ticket.title} />
                                </div>
                            </MUI.Card>
                        );
                    })}
                </MUI.List>
            </MUI.Grid>
        </>
    );
};

export default TicketDashboard;