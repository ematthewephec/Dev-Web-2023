import React from 'react';
import Navigation from '../NavBar/NavBar.js';
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