import React from 'react';
import { Button, ListGroup, Col, Row } from 'react-bootstrap';
import AdminOrderDetails from './AdminOrderDetails';

function AdminOrderList(props) {
    const orders = props.orders.map((order) => 
        <ListGroup.Item key={order.OrderID}>
            <Row>
                <Col>{order.UserName}</Col>
                <Col>{order.ProductName} - QTY:{order.NumItems}</Col>
                <Col>{(order.OrderSubtotal).toFixed(2)}€</Col>
                <Col>{order.OrderDate}</Col>
                <Col>
                    <AdminOrderDetails order={order} />
                </Col>
                <Col>
                    {order.WasCancelled === 0 ? 
                        <Button 
                            onClick={() => props.cancelOrder(order.OrderID)}
                        >
                            Cancel Order
                        </Button>
                    : <Button>Cancelled</Button>}
                </Col>
            </Row>
        </ListGroup.Item>
    );
    
    return(
        <>
            {props.orders.length > 0 ? (
                <ListGroup>
                    {orders}
                </ListGroup>
            ) : (
                <p>No orders made on website!</p>
            )}
        </>
    )
}

export default AdminOrderList;