import React, { useRef, useState } from 'react';
import * as MUI from "../../MaterialUI";
import { useSelector } from 'react-redux';

//Needs to be hidden at window width 600px and below,
//Check TicketPreview component for comment on when to hide
const NavDrawer = (props) => {
    const opentickets = useRef();
    const closedtickets = useRef();

    const classes = MUI.useStyles();
    const { loggedUserRole } = useSelector(state => state.tickets);
    const [anchorEl, setAnchorEl] = useState();

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const setActive = (e) => {
        const ref = e.currentTarget.id === 'open-tickets' ? opentickets : closedtickets;
        ref.current.classList.add("active");
    };

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = e => {
        setAnchorEl(null);
    };

    return (
        <MUI.Drawer
            id = "navDrawer"
            className={`${classes.drawer} ${props.open === false ? 'hide' : ''}`}
            classes={{
                paper: classes.drawerPaper
            }}
            variant='persistent'
            anchor='left'
            open={props.open}
        >
            <MUI.List
                className={classes.list}>
                <MUI.ListItem className={classes.dashboardtitle}>
                    <span>DevDesk</span>
                    <MUI.IconButton onClick={handleClick}>
                        <MUI.PersonIcon />
                    </MUI.IconButton>
                    <MUI.Menu
                        id='account-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MUI.MenuItem onClick={() => {
                            handleClose();
                            logout();
                        }}>Logout</MUI.MenuItem>
                        <MUI.MenuItem onClick={handleClose}>View Profile</MUI.MenuItem>
                    </MUI.Menu>
                </MUI.ListItem>
            </MUI.List>
            <MUI.Divider />
            <MUI.List
                ref={opentickets}
                id='open-tickets'
                className={classes.list}
                onClick={(e) => setActive(e)}>
                <MUI.ListItem
                    className={classes.listitem}
                    button
                    onClick={() => {
                            props.updateStatusText("Open Tickets");
                            props.filterTickets("OPEN");
                        }
                    }>{loggedUserRole === "STUDENT" ? "Open Tickets" : "All Tickets"}</MUI.ListItem>
            </MUI.List>
            <MUI.Divider />
            <MUI.List
                ref={closedtickets}
                id='closed-tickets'
                onClick={(e) => setActive(e)}     
                className={classes.list}>
                <MUI.ListItem
                    className={classes.listitem}
                    button
                    onClick={() => {
                            props.updateStatusText("Closed Tickets");
                            props.filterTickets("CLOSED");
                        }
                    }>{loggedUserRole === "STUDENT" ? "Closed Tickets" : "My Tickets"}</MUI.ListItem>
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