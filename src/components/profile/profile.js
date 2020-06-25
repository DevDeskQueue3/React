import React from 'react';

import { useSelector } from 'react-redux';

const Profile = (props) => {
    const { user } = useSelector(state => state.login);

    console.log(user);

    return (
        <h1>Profile Coming Soon...</h1>
    );
};

export default Profile;