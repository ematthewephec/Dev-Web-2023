import './BasketList.css';
import React from 'react';
import { Container, Card, ListGroup, Col } from 'react-bootstrap';

function BasketList(props) {
    const items = props.basket.map((item) => 
        <ListGroup.Item key={item.ItemIndex}>
            <Col>{item.ProductName} * {item.ItemQuantity}</Col>
            <Col>{item.ProductPrice * item.ItemQuantity}</Col>
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
                            <p className="text-right">Subtotal: {subtotal}</p>  
                        </Card>
                    </>
                }
            </Container>
        </div>
    )
}

export default BasketList;