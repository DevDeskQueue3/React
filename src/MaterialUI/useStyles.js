import { makeStyles, createMuiTheme } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

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