import React, { useState, useEffect } from 'react';
import './NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";

import logo from '../../Assests/Logo.jpg';
import basket from '../../Assests/cart.svg';
import {BASKET_URL} from "../utils/Constants";

function NavbarComponent() {
    const [myBasket, setBasket] = useState([]);
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }

    const getBasket = async () => {
        const userId = userData.id;
        fetch(`${BASKET_URL}/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setBasket(data);
                return;
            })
    }

    const [cartItemCount, setCartItemCount] = useState(0);

    // Simuler le contenu du panier (à remplacer avec votre propre logique)
    const cartItems = [
        // ... liste des articles dans le panier
    ];

    useEffect(() => {
        getBasket();
    }, []);

    useEffect(() => {
        const totalCartItemCount = myBasket.reduce(
            (total, item) => total + item.ItemQuantity,
            0
        );
        setCartItemCount(totalCartItemCount);
    }, [myBasket]);


    return (
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
                        <Nav.Link href='/profile'>Profil</Nav.Link>
                        <Nav.Link href='/connect'>Login/Register</Nav.Link>
                        <Nav.Link className="bi bi-cart" href='/basket'>
                            <img
                                src={basket}
                                alt="Basket"
                                title="Basket"
                                height="25"
                            />
                            {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
