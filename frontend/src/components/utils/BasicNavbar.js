import React from 'react';
import Navbar from '../common/Navbar';
import { Outlet } from 'react-router-dom';

const BasicNavbar = () => {
    return(
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default BasicNavbar;