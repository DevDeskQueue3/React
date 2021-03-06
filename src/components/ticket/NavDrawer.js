import React, { useRef, useState, useEffect } from 'react';
import * as MUI from "../../MaterialUI";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import useForm from '../../hooks/useForm';
import { passwordCheckSchema } from '../../utils/loginFormValidation';
import { getToken, addUserRole } from '../../actions/login';
import { setLoggedUserRole } from '../../actions/tickets';
import { Link, useRouteMatch } from 'react-router-dom';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



//Needs to be hidden at window width 600px and below,
//Check TicketPreview component for comment on when to hide
const NavDrawer = (props) => {
    const {url} = useRouteMatch();
    const opentickets = useRef();
    const closedtickets = useRef();

    const classes = MUI.useStyles();
    const { user, error } = useSelector(state => state.login)
    const { loggedUserRole } = useSelector(state => state.tickets);
    const [anchorEl, setAnchorEl] = useState();
    const [passwordModal, setPasswordModal] = useState(false);
    const [checkingPassword, setCheckingPassword] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const modalClasses = useStyles();
    const [modal, handleChange, formErrors] = useForm({password: ""}, passwordCheckSchema);
    const dispatch = useDispatch();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    

    const logout = () => {
        localStorage.removeItem("devdesk-auth");
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    const setActive = (e) => {
        const ref = e.currentTarget.id === 'open-tickets' ? opentickets : closedtickets;
        const prevRef = ref; // store previous ref so that it can be made inactive
        prevRef.current.classList.toggle("active");
        ref.current.classList.toggle("active"); // set the new ref to active
    };

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = e => {
        setAnchorEl(null);
    };


    const changeRole = e => {
        dispatch(addUserRole({id: user.id, roles: ["STUDENT", "HELPER"]}));
        
        if(loggedUserRole === "STUDENT") {
            dispatch(setLoggedUserRole("HELPER"));
        } else {
            dispatch(setLoggedUserRole("STUDENT"));
        }

    }

    const closePasswordModal = () => {
        setPasswordModal(false);
    };

    const checkPassword = e => {
        e.preventDefault();

        
    }

    useEffect(() => {
        passwordCheckSchema.isValid(modal).then(valid => {
            setIsButtonDisabled(!valid);
        });
    }, [modal]);

    const modalBody = (
        <div style={modalStyle} className={modalClasses.paper}>
            <h2 id="simple-modal-title">{loggedUserRole === "STUDENT" ? "Become a Helper" : "Add Student Role"}</h2>
            <p id="simple-modal-description">
                Please enter your password to add the {loggedUserRole === "STUDENT" ? "Helper" : "Student"} role.
            </p>
            <form onSubmit = {checkPassword}>
                <MUI.TextField style = {{width: 200}} error = {formErrors.password.length > 0} helperText = {formErrors.password.length > 0 && formErrors.password} id = "password" name = "password" type = "password" value = {modal.password} onChange = {handleChange} />
                <MUI.Button type = "submit" disabled = {isButtonDisabled}>Submit</MUI.Button>
            </form>
        </div>
    );

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
                        <MUI.MenuItem onClick={handleClose}>
                            <Link to={`${url}/tickets`}>View Tickets</Link>
                        </MUI.MenuItem>
                        {/* <MUI.MenuItem onClick={handleClose}>
                            <Link to={`${url}/profile`}>View Profile</Link>
                        </MUI.MenuItem> */}

                        <MUI.MenuItem onClick={changeRole}>
                            {
                                loggedUserRole === "STUDENT" ? 
                                    user.roles.includes("HELPER") ? "Helper View" : "Become a Helper" :
                                    user.roles.includes("STUDENT") ? "Student View" : "Add Student Role"
                            }
                        </MUI.MenuItem>

                        <Modal
                            open={passwordModal}
                            onClose={closePasswordModal}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {modalBody}
                        </Modal>
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
                            let filterValue = loggedUserRole === "HELPER" ? "ALL" : "OPEN";
                            props.updateStatusText(`${filterValue} Tickets`);
                            props.filterTickets(filterValue);
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
                            let filterValue = loggedUserRole === "HELPER" ? "MY" : "CLOSED";
                            props.updateStatusText(`${filterValue} Tickets`);
                            props.filterTickets(filterValue);
                        }
                    }>{loggedUserRole === "STUDENT" ? "Closed Tickets" : "My Tickets"}</MUI.ListItem>
            </MUI.List>
            <MUI.Divider />
            <MUI.TreeView
                className={classes.root}
                defaultCollapseIcon={<MUI.ExpandMoreIcon />}
                defaultExpandIcon={<MUI.ChevronRightIcon />}
            >
                <MUI.TreeItem nodeId='1' label={<MUI.Typography className={`${classes.filteritem} ${classes.filterheader}`}>Filter Tickets</MUI.Typography>}>
                    <MUI.TreeItem nodeId='2' label={<MUI.Typography className={`${classes.filteritem} ${classes.filterheader}`}>Categories</MUI.Typography>}>
                        <MUI.TreeItem nodeId='3' onClick={() => { props.updateStatusText('Equipment Issues'); props.filterTickets('Equipment') }} label={<MUI.Typography className={classes.filteritem}>Equipment</MUI.Typography>} />
                        <MUI.TreeItem nodeId='4' onClick={() => { props.updateStatusText('People Issues'); props.filterTickets('People') }} label={<MUI.Typography className={classes.filteritem}>People</MUI.Typography>} />
                        <MUI.TreeItem nodeId='5' onClick={() => { props.updateStatusText('Track Issues'); props.filterTickets('Track') }} label={<MUI.Typography className={classes.filteritem}>Track</MUI.Typography>} />
                        <MUI.TreeItem nodeId='6' onClick={() => { props.updateStatusText('Finance Issues'); props.filterTickets('Finances') }} label={<MUI.Typography className={classes.filteritem}>Finances</MUI.Typography>} />
                        <MUI.TreeItem nodeId='7' onClick={() => { props.updateStatusText('Other Issues'); props.filterTickets('Other') }} label={<MUI.Typography className={classes.filteritem}>Other</MUI.Typography>} />
                    </MUI.TreeItem>
                    <MUI.TreeItem nodeId='8' label={<MUI.Typography className={`${classes.filteritem} ${classes.filterheader}`}>Status</MUI.Typography>}>
                        <MUI.TreeItem nodeId='9' onClick={() => { props.updateStatusText('Open Tickets'); props.filterTickets('OPEN') }} label={<MUI.Typography className={classes.filteritem}>Open</MUI.Typography>} />
                        <MUI.TreeItem nodeId='10' onClick={() => { props.updateStatusText('Resolved Tickets'); props.filterTickets('RESOLVED') }} label={<MUI.Typography className={classes.filteritem}>Resolved</MUI.Typography>} />
                        <MUI.TreeItem nodeId='12' onClick={() => { props.updateStatusText('Closed Tickets'); props.filterTickets('CLOSED') }} label={<MUI.Typography className={classes.filteritem}>Closed</MUI.Typography>} />
                    </MUI.TreeItem>
                    {/* <MUI.TreeItem nodeId='13' label={<MUI.Typography className={`${classes.filteritem} ${classes.filterheader}`}>Assigned To</MUI.Typography>}>
                        <MUI.TreeItem nodeId='14' label={<MUI.Typography className={classes.filteritem}>Team Lead</MUI.Typography>} />
                        <MUI.TreeItem nodeId='15' label={<MUI.Typography className={classes.filteritem}>Section Lead</MUI.Typography>} />
                    </MUI.TreeItem>
                    <MUI.TreeItem nodeId='16' label={<MUI.Typography className={`${classes.filteritem} ${classes.filterheader}`}>Urgency</MUI.Typography>}>
                        <MUI.TreeItem nodeId='17' label={<MUI.Typography className={classes.filteritem}>Normal</MUI.Typography>} />
                        <MUI.TreeItem nodeId='18' label={<MUI.Typography className={classes.filteritem}>Urgent</MUI.Typography>} />
                        <MUI.TreeItem nodeId='19' label={<MUI.Typography className={classes.filteritem}>Very Urgent</MUI.Typography>} />
                        <MUI.TreeItem nodeId='20' label={<MUI.Typography className={classes.filteritem}>Emergency</MUI.Typography>} />
                    </MUI.TreeItem> */}
                </MUI.TreeItem>
                
            </MUI.TreeView>
        </MUI.Drawer>
    );
};

export default NavDrawer;