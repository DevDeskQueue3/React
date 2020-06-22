import React from 'react';

import * as MUI from '../../MaterialUI/index';

const Burger = (props) => {
    const classes = MUI.useStyles();
    
    return (
        <MUI.Button
            variant='contained'
            className={classes.burgerwrapper}
            onClick={() => props.handleDrawerOpen()}
        >
            <MUI.MenuIcon
                fontSize='large' />
        </MUI.Button>
    );
};

export default Burger;