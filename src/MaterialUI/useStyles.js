import { makeStyles, createMuiTheme, Button, withStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: orange,
    }
});

const leftDrawerWidth = "25%";

export const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            borderColor: theme.palette.primary,
            backgroundColor: orange[700]
        }
    }
}))(Button);

const useStyles = makeStyles((theme) => ({
    loginInput: {
        width: "100%",
        height: "74px",
        marginBottom: "21px !important",
        marginRight: "10px !important",
    },
    dashboardRoot: {
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        //marginTop: "40px",
        display: 'flex',
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        background: "#F9FAFB",
    },
    burgerwrapper: {
        background: "rgba(200,200,200,.9)",
        top: "10px",
        margin: "0 40px 20px 0",
        width: "5px",
        height: "50px",
        zIndex: "1250",
        //position: "fixed",
        '&:hover': {
            background: "rgba(190,190,190,.9)"
        }
    },
    dashboardtitle: {
        fontWeight: 'bold',
        display: "flex !important",
        alignItems: "center !important",
        justifyContent: "space-between !important",
    },
    filterheader: {
        fontWeight: 'bold'
    },
    filteritem: {
        fontSize: '1.2rem',
        margin: '9px 0'
    },
    ticketList: {
        border: "1px solid red",
    },
    tooltip: {
        fontWeight: 'bold'
    },
    list: {
        fontSize: '1.5rem',
        padding: '10px 0 10px 0',
        '&:hover div': {
            borderLeft: '4px solid rgb(0, 171, 236)',
            backgroundColor: 'rgba(22, 142, 245, 0.13)'
        }
    },
    listitem: {
        paddingLeft: '10px',
        padding: '7% 7%',
        borderLeft: '4px solid rgba(255,255,255,0)', /* This prevents jitter on hover - Darren Tebo */
    },
    card: {
        margin: '0 0px 17px 0px',
        textAlign: 'left',
        width: '97%',
        maxHeight: '120px',
        transition: 'max-height .4s linear',
        overflow: 'hidden'
    },
    details: {
        display: 'flex',
        padding: '0'
    },
    timeframe: {
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #cecece',
        margin: '10px 0',
        justifyContent: 'center',
        width: '108px',
        maxWidth: '110px',
        '& div': {
            position: 'relative',
            top: '20%'
        }
    },
    cardsection: {
        fontSize: '1.5rem',
        '& div': {
            fontWeight: '600'
        },
        '& div.header': {
            fontWeight: '600'
        }
    },
    header: {
        margin: '5px',
        padding: '10px 0 0 0',
        '& span': {
            fontWeight: '700'
        }
    },
    subtitle: {
        fontWeight: 'normal',
        fontSize: '.9rem',
        width: '85%',
        marginBottom: '10px',
        paddingLeft: '5px'
    },
    margin: {
        margin: theme.spacing(1)
    },
    drawer: {
        width: leftDrawerWidth,
        minWidth: 185,
        maxWidth: 354,
        flexShrink: 0,
        fontFamily: 'Electrolized, verdana, segoe'
    },
    drawerPaper: {
        width: leftDrawerWidth, 
        minWidth: 185,
        maxWidth: 354
    },
    profilePaper: {
        width: '100%',
        padding: '10px'
    },
    previewDrawer: {
        display: 'none',
        position: "fixed",
        maxWidth: 479,
        height: 450,
        flexShrink: 0,
        marginTop: '30px',
    },
    drawerVisible: {
        display: 'block',
        
    },
    rightPane: {
        width: "40%",
        height: "100vh",
        //borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    },
    previewHelperText: {
        color: "#BBB",
        fontSize: 26,
    },  
    paper: {
        marginRight: theme.spacing(2),
    },
    addTicketButton: {
        background: "#ff9800",
        borderRadius: "100px",
        width: "80px",
        height: "80px",
        position: "fixed",
        right: "38%",
        bottom: "50px",
        '&:hover': {
            backgroundColor: "rgba(255, 152, 0, 0.7607843137254902)"
        },
        "& span svg": {
            width: "45px",
            height: "45px"
        }
    },
}));

export default useStyles;