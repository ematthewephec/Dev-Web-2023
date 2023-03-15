import React from 'react';
import Navigation from '../common/Navigation';
import { Outlet } from 'react-router-dom';

const BasicNavbar = () => {
    return(
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default BasicNavbar;