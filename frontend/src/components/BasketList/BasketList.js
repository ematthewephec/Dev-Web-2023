import './BasketList.css';
import React, { useState, useEffect } from 'react';
import { Button, Container, Card, ListGroup, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {ToastContainer, toast} from "react-toastify";
import {BASKET_URL} from "../utils/Constants";
import Cookies from "js-cookie";
import { useNavigate  } from 'react-router-dom';

function BasketList(props) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModalConnect, setShowModalConnect] = useState(false);
    const [basket, setBasket] = useState([]);
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }


    function getLocalCart() {
        return JSON.parse(localStorage.getItem('localCart')) || [];
    }

    function removeItemFromLocalCart(itemIndex) {
        const cart = JSON.parse(localStorage.getItem('localCart')) || [];
        const updatedCart = cart.filter(item => item.ItemIndex !== itemIndex);
        localStorage.setItem('localCart', JSON.stringify(updatedCart));

        toast.success('Article supprimé', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    const addToBasket = async (localCart) => {
        for (const item of localCart) {
            const {itemId, ProductName, ProductPrice, ItemQuantity} = item;
            // Utilisez votre route pour ajouter les éléments au panier en base de données
            const response = await fetch(`${BASKET_URL}/add/${userData.idUser}/${itemId}/${ItemQuantity}`, {
                method: 'POST',
            });

            if (response.ok) {
               window.location.reload()
            }
        }
    };

    useEffect(() => {
        if (userData) {
            // Si l'utilisateur est connecté, mettez à jour le panier avec les données du panier utilisateur
            setBasket(props.basket);
            const localCart = getLocalCart();
            if (localCart.length > 0) {
                addToBasket(localCart); // Assurez-vous que addToBasket ajoute correctement les éléments au panier
                localStorage.removeItem('localCart');
            }
        } else {
            // Si l'utilisateur n'est pas connecté, récupérez les données du panier local
            const localCart = getLocalCart();
            setBasket(localCart);
        }
    }, [userData, props.basket]);

    const items = basket.map((item) =>
        <ListGroup.Item key={item.ItemIndex}>
            <Row>
                <Col>{item.ProductName}</Col>
                <Col>QTY: {item.ItemQuantity}</Col>
                <Col>{(item.ProductPrice * item.ItemQuantity).toFixed(2)}€</Col>
                <Col>
                    {userData ?
                        <Button
                        onClick={() => props.removeItem(item.ItemIndex)}
                    >
                        Delete Item
                    </Button> :
                        <Button
                            onClick={() => removeItemFromLocalCart(item.ItemIndex)}// ici faire la suppresion en local ->chatgpt
                        >
                            Delete Item
                        </Button>}
                </Col>
            </Row>
        </ListGroup.Item>
    );

    const handleSubmit  = async (event)  => {
        if (userData) {
            const currentDate = new Date().toISOString().split('T')[0];
            const response = await fetch(`${BASKET_URL}/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userData.idUser,  orderDate: currentDate }),
            });
            if(response.ok){
                toast.success('Commande envoyée', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                setShowModal(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
            else{
                toast.error('Erreur lors de la commande', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }

        } else {
            // Gérer le cas où userData est null
            setShowModalConnect(true);
            console.error('userData is null');
        }

    }

    const recap = basket.map((item) =>
        <ListGroup.Item key={item.ItemIndex}>
            <Row>
                <Col>{item.ProductName}</Col>
                <Col>QTY: {item.ItemQuantity}</Col>
                <Col>{(item.ProductPrice * item.ItemQuantity).toFixed(2)}€</Col>
            </Row>
        </ListGroup.Item>
    );

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalConnectClose = () => {
        setShowModalConnect(false);
        setShowModal(false);
    };



    function clearCart(){
        localStorage.removeItem('localCart');
        toast.success('Panier vider ', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    const redirectToLoginPage = () => {
        navigate('/connect');
    };

    const subtotal = basket.reduce((acc, obj) => acc + Number((obj.ProductPrice * obj.ItemQuantity).toFixed(2)), 0).toFixed(2);

    return(
        <div className='basketList'>
            <Container className='basketList-list'>
                {basket.length < 1 &&
                    <>
                        <p> Votre panier est vide! </p>
                    </>
                }
                {basket.length >= 1 &&
                    <>
                        <Card className="card bg-secondary text-left">
                            <Card.Body className='card-body basket'>
                                <ListGroup>
                                    {items}
                                </ListGroup>
                            </Card.Body>
                            <p className="text-right">Subtotal: {subtotal}€</p>
                            {userData ?
                                <Button variant="danger" onClick={() => props.clearBasket()}>Clear Basket</Button>
                                :
                                <Button variant="danger"  onClick={() =>  clearCart()}>Clear Basket</Button>
                            }
                        </Card>
                    </>
                }
            </Container>
            {basket.length >= 1 ?
                <div className="mt-2">
                    <Button onClick={() => setShowModal(!showModal)}>
                        Valider ma commande
                    </Button>
                </div>
                : null}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Récapitulatif de la commande</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {recap}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleSubmit()}
                    >
                        Valider
                    </button>
                    <Button onClick={() => setShowModal(!showModal)}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalConnect} onHide={handleModalConnectClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Connectez-vous pour valider votre panier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Connectez-vous à votre compte pour valider votre panier.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="btn btn-success"
                        onClick={redirectToLoginPage}
                    >
                        Se connecter
                    </Button>
                    <Button onClick={handleModalConnectClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default BasketList;
