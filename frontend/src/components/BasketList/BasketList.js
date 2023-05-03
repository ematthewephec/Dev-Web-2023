import './BasketList.css';
import React from 'react';
import { Button, Container, Card, ListGroup, Col, Row } from 'react-bootstrap';

function BasketList(props) {
    const items = props.basket.map((item) => 
        <ListGroup.Item key={item.ItemIndex}>
            <Row>
                <Col>{item.ProductName}</Col>
                <Col>QTY: {item.ItemQuantity}</Col>
                <Col>{item.ProductPrice * item.ItemQuantity}€</Col>
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

    const subtotal = props.basket.reduce((acc, obj) => acc + (obj.ProductPrice * obj.ItemQuantity), 0);
    
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
        </div>
    )
}

export default BasketList;