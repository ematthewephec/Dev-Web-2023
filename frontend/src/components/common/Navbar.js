import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="links" to="/">
                    <img
                        src={logo}
                        alt="Informateur"
                        title="Informateur"
                        height="50"
                    />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;