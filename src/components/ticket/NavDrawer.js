import React, { useRef } from 'react';
import * as MUI from "../../MaterialUI";


//Needs to be hidden at window width 600px and below,
//Check TicketPreview component for comment on when to hide
const NavDrawer = () => {
    const list = useRef();
    const classes = MUI.useStyles();

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const setActive = (e) => {
        console.log('setactive: ', list)
        list.current.classList.add("active");
    };

    return (
        <MUI.Drawer
                    id = "navDrawer"
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant='permanent'
                    anchor='left'
                >
                    <MUI.List
                        className={classes.list}>
                        <MUI.ListItem className={classes.dashboardtitle}>
                            The Queue
                            <MUI.Button variant="contained" onClick={logout}>Logout</MUI.Button>
                        </MUI.ListItem>
                    </MUI.List>
                    <MUI.Divider />
                    <MUI.List
                        ref={list}
                        className={classes.list}
                        onClick={(e) => setActive(e)}>
                        <MUI.ListItem
                            className={classes.listitem}
                            button>All Tickets</MUI.ListItem>
                    </MUI.List>
                    <MUI.Divider />
                    <MUI.List
                        
                        className={classes.list}>
                        <MUI.ListItem
                            className={classes.listitem}
                            button>My Tickets</MUI.ListItem>
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
    );
};

export default NavDrawer;