import React, { useState } from 'react';

import * as MUI from '../../MaterialUI/index';

const Burger = (props) => {
    const classes = MUI.useStyles();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MUI.Button
            variant='contained'
            className={classes.burgerwrapper}
            onClick={() => {
                    props.toggleDrawer();
                    setIsOpen(!isOpen);
                }
            }
        >
            {isOpen ? <MUI.ChevronLeftIcon fontSize='large' /> : <MUI.MenuIcon fontSize='large' />}
        </MUI.Button>
    );
};

export default Burger;