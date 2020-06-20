import { makeStyles, createMuiTheme, Button, withStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

const drawerWidth = 240;

export const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
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
        display: 'flex'
    },
    dashboardtitle: {
        fontWeight: 'bold'
    },
    list: {
        fontSize: '1.5rem',
        padding: '0'
    },
    listitem: {
        padding: '7% 7%',
        '&:hover': {
            backgroundColor: 'rgba(22, 142, 245, 0.13)',
            borderLeft: '4px solid rgb(0, 171, 236)'
        }
    },
    card: {
        margin: '0 0 10px 20px',
        textAlign: 'left',
        width: '100%'
    },
    details: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0'
    },
    timeframe: {
        borderRight: '1px solid #cecece',
        margin: '10px 0',
        width: '100px',
        '& p': {
            position: 'relative',
            top: '20%'
        }
    },
    cardsection: {
        fontSize: '1.4rem',
        '& div': {
            fontWeight: '600'
        },
        '& div.header': {
            fontWeight: '600'
        }
    },
    header: {
        margin: '5px',
        padding: '10px 0 0 0'
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
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    }
}));

export default useStyles;