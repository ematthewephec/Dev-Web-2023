import React from 'react';
//import './NavBar.css'
import {Container, Nav, Navbar} from 'react-bootstrap';
import logo from '../../Assests/Logo.jpg';

function AdminNavbar(){
    return(
        <Navbar className='navbar'>
            <Container>
                <Navbar.Brand href="/admin">
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
                        <Nav.Link href="/">Return to Main Page</Nav.Link>
                        <Nav.Link href='#'>Order List</Nav.Link>
                        <Nav.Link href='#'>Users List</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AdminNavbar;
