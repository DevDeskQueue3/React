import React, {useState} from 'react';

import * as MUI from '../../MaterialUI/index';

const Burger = (props) => {
    const [visible, setVisible] = useState(true);

    const classes = MUI.useStyles();

    return (
        <MUI.Button
            variant='contained'
            className={classes.burgerwrapper}
            onClick={() => props.toggleDrawer(visible)}
        >
            <MUI.MenuIcon
                fontSize='large' />
        </MUI.Button>
    );
};

export default Burger;