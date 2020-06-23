import React, { useEffect } from 'react';

import * as MUI from '../../MaterialUI/index';

const Burger = (props) => {
    const classes = MUI.useStyles();
    

    return (
        <MUI.Button
            variant='contained'
            className={classes.burgerwrapper}
            onClick={() => {
                    props.toggleDrawer();
                }
            }
        >
            {props.open ? <MUI.ChevronLeftIcon fontSize='large' /> : <MUI.MenuIcon fontSize='large' />}
        </MUI.Button>
    );
};

export default Burger;