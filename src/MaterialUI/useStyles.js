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
    card: {
        margin: '0 0 10px 20px',
        minWidth: '500px'
    },
    details: {
        display: 'flex',
        padding: '10px'
    },
    timeframe: {
        borderRight: '1px solid #cecece',
        '& p': {
            position: 'relative',
            top: '20%'
        }
    },
    header: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        margin: '2px'
    },
    subtitle: {
        fontWeight: 'normal',
        width: '90%',
        marginBottom: '10px',
        paddingLeft: '15px'
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