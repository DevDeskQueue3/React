import React from 'react';
import * as MUI from '../../MaterialUI/index';
import { useSelector } from 'react-redux';

import './profile.css';

const Profile = (props) => {
    const classes = MUI.useStyles();
    const { user } = useSelector(state => state.login);

    console.log(user);

    return (
        <div className='profile-wrapper'>
            <MUI.Paper
                className={classes.profilePaper}
                elevation={2}
            >
                <MUI.Typography
                    variant='h3'
                    component='h3'
                >{`Welcome, ${user.name}`}</MUI.Typography>
                <section className='user-data'>
                    <MUI.Typography
                        variant='h4'
                        component='h4'>Roles: {user.roles.map(role => {
                            return (<p key={user.id}>{role}</p>)
                        })}</MUI.Typography>
                </section>
            </MUI.Paper>
        </div>
    );
};

export default Profile;