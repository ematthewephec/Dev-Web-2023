import './BasketList.css';
import React, { useState } from 'react';
import { Button, Container, Card, ListGroup, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


function BasketList(props) {
    const [showModal, setShowModal] = useState(false);
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
            <div className="mt-2">
                <Button onClick={() => setShowModal(!showModal)}>
                    Valider ma commande
                </Button>
            </div>
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
                        onClick={() => setShowModal(!showModal)}
                    >
                        Valider
                    </button>
                    <Button onClick={() => setShowModal(!showModal)}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BasketList;
