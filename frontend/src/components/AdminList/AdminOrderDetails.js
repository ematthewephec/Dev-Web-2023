import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function AdminOrderDetails(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const TrueOrFalse = (number) => {
        return (number === 1) ? "True" : "False";
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Order Details
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Order ID: {props.order.OrderID}</p>
                    <p>User Name: {props.order.UserName}</p>
                    <p>Product Name: {props.order.ProductName}</p>
                    <p>Quantity: {props.order.NumItems}</p>
                    <p>Order Subtotal: {(props.order.OrderSubtotal).toFixed(2)}€</p>
                    <p>Order Date: {props.order.OrderDate}</p>
                    <p>Paid: {TrueOrFalse(props.order.WasPaid)}</p>
                    <p>Delivered: {TrueOrFalse(props.order.WasDelivered)}</p>
                    <p>Cancelled: {TrueOrFalse(props.order.WasCancelled)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminOrderDetails;