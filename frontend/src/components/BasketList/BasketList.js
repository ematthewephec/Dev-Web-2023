import './BasketList.css';
import React, { useState } from 'react';
import { Button, Container, Card, ListGroup, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {ToastContainer, toast} from "react-toastify";
import {BASKET_URL} from "../utils/Constants";
import Cookies from "js-cookie";

function BasketList(props) {
    const [showModal, setShowModal] = useState(false);
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }


    const items = props.basket.map((item) =>
        <ListGroup.Item key={item.ItemIndex}>
            <Row>
                <Col>{item.ProductName}</Col>
                <Col>QTY: {item.ItemQuantity}</Col>
                <Col>{(item.ProductPrice * item.ItemQuantity).toFixed(2)}€</Col>
                <Col>
                    <Button
                        onClick={() => props.removeItem(item.ItemIndex)}
                    >
                        Delete Item
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );

    const handleSubmit  = async (event)  => {
        const response = await fetch(`${BASKET_URL}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: userData.idUser} ),
        });

        // Affichez un message de succès ou utilisez une notification pour informer l'utilisateur
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
    }

    const recap = props.basket.map((item) =>
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

    const subtotal = props.basket.reduce((acc, obj) => acc + Number((obj.ProductPrice * obj.ItemQuantity).toFixed(2)), 0).toFixed(2);

    return(
        <div className='basketList'>
            <Container className='basketList-list'>
                {props.basket.length < 1 &&
                    <>
                        <p> Votre panier est vide! </p>
                    </>
                }
                {props.basket.length >= 1 &&
                    <>
                        <Card className="card bg-secondary text-left">
                            <Card.Body className='card-body basket'>
                                <ListGroup>
                                    {items}
                                </ListGroup>
                            </Card.Body>
                            <p className="text-right">Subtotal: {subtotal}€</p>
                            <Button variant="danger" onClick={() => props.clearBasket()}>Clear Basket</Button>
                        </Card>
                    </>
                }
            </Container>
            {props.basket.length >= 1 ?
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
            <ToastContainer />
        </div>
    )
}

export default BasketList;
