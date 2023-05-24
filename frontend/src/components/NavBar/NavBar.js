
import React from 'react';
import './NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../Assests/Logo.jpg';

import basket from '../../Assests/cart.svg';

function Navigation(){
    return(
        <Navbar className='navbar'>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        alt="Informateur"
                        title="Informateur"
                        height="50"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href='/articles'>Articles</Nav.Link>
                        <Nav.Link href='/connect'>Login/Register</Nav.Link>
                        <Nav.Link className="bi bi-cart"
                            href='/basket'
                        >
                            <img
                                src={basket}
                                alt="Basket"
                                title="Basket"
                                height="25"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;
