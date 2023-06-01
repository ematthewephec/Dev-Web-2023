import React, {useEffect, useState} from 'react';
import './NavBar.css'
import {Container, Nav, Navbar} from 'react-bootstrap';
import { CookieGetter, CookieRemover } from '../utils/CookieToggle';
import { SESSION_URL } from '../utils/Constants';

import logo from '../../Assests/Logo.jpg';
import basket from '../../Assests/cart.svg';

function Navigation(){
    const [cookie, setCookie] = useState(null);
    
    useEffect(()=> {
        const getCookie = () => {return <CookieGetter name='access_token'/>}
        console.log(getCookie);
        //setCookie(getCookie);
    }, [cookie])

    const clearCookie = () => {
        fetch(`${SESSION_URL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const removeTokenCookie = () => {
                return <CookieRemover 
                    name="access_token"
                />
            }
            const removeUserCookie = () => {
                return <CookieRemover 
                    name="user"
                />
            }
            window.location.replace('/');
        });
    }

    const checkCookie = async () => {
        console.log();
    }
    
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
                        {cookie ? (
                            <Nav.Link href="#" onClick={checkCookie}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link href='/login'>Login/Register</Nav.Link>
                        )}
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