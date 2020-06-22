import { makeStyles, createMuiTheme, Button, withStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

const leftDrawerWidth = "25%";

export const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700]
        }
    }
}))(Button);

const useStyles = makeStyles({
    loginInput: {
        width: "100%",
        height: "74px",
        marginBottom: "21px !important",
        marginRight: "10px !important",
    },
    dashboardRoot: {
        width: "100%",
        display: 'flex',
        flexWrap: "nowrap",
        justifyContent: "space-between",
    },
    dashboardtitle: {
        fontWeight: 'bold',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    list: {
        fontSize: '1.5rem',
        padding: '10px 0 10px 0'
    },
    listitem: {
        padding: '7% 7% !important',
        borderLeft: '4px solid rgba(255,255,255,0)', /* This prevents jitter on hover - Darren Tebo */
        '&:hover div': {
            borderLeft: '4px solid rgb(0, 171, 236)',
            backgroundColor: 'rgba(22, 142, 245, 0.13)',
            padding: '10px 0 10px 0'
        }
    },
    card: {
        margin: '0 0px 17px 0px',
        textAlign: 'left',
        width: '97%'
    },
    details: {
        display: 'flex',
        padding: '0'
    },
    timeframe: {
        borderRight: '1px solid #cecece',
        margin: '10px 0',
        width: '108px',
        maxWidth: '110px',
        '& p': {
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
    tooltip: {
        fontSize: '1.4rem'
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

    },
    drawerPaper: {
        width: leftDrawerWidth, 
        minWidth: 185,
        maxWidth: 354
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
        display: 'block'
    },
    rightPane: {
        width: "50%",
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
        backgroundColor: "#ff9800",
        borderRadius: "100px",
        width: "80px",
        height: "80px",
        position: "fixed",
        right: "43%",
        bottom: "100px",
        '&:hover': {
            backgroundColor: "rgba(255, 152, 0, 0.7607843137254902)"
        },
        "& span svg": {
            width: "45px",
            height: "45px"
        }
    },
});

export default useStyles;