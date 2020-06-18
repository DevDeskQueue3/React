import { makeStyles, createMuiTheme, Button, withStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

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
    margin: {
        margin: theme.spacing(1)
    }
}));

export default useStyles;