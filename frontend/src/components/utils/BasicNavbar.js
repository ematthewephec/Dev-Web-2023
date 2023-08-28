import React from 'react';
import Navigation from '../NavBar/NavBar.js';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer.js';

const BasicNavbar = () => {
    return(
        <>
            <Navigation />
            <div className="content">
             <Outlet  />
            </div>
            <Footer />
        </>
    )
}

export default BasicNavbar;
