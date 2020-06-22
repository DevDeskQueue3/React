import React from 'react';

import * as MUI from '../../MaterialUI/index';

const BurgerMenu = () => {
    const classes = MUI.useStyles();

    return (
        <MUI.Button
            variant='contained'
            className={classes.burgerwrapper}
        >
            <MUI.MenuIcon
                fontSize='large' />
        </MUI.Button>
    );
};

export default BurgerMenu;