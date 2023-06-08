import React, { useEffect, useState } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { PRODUCT_URL } from '../utils/Constants';

function AdminProductModal(props) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        productName: props.product.ProductName,
        productDesc: props.product.ProductDesc,
        productStock: props.product.ProductStock,
        productPrice: props.product.ProductPrice,
        productOnSale: props.product.productOnSale,
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendForm = (formData) => {
        fetch(`${PRODUCT_URL}/${props.product.ProductID}`, {
            method: 'PUT',
            body: formData ? JSON.stringify({
                productName: formData.productName,
                productDesc: formData.productDesc,
                productStock: parseInt(formData.productStock),
                productPrice: parseFloat(formData.productPrice),
                productOnSale: formData.productOnSale,
            }) : null,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(() => {
            handleClose();
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Faites quelque chose avec les données d'inscription, par exemple envoyer une requête au serveur
        // Réinitialisez les champs du formulaire
        setFormData({
            productName: '',
            productDesc: '',
            productStock: '',
            productPrice: '',
            productOnSale: false,
        });
        sendForm(formData);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Product Details
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details: {props.product.ProductID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Product Name:</Form.Label>
                            <Form.Control 
                                type="text"
                                name="productName"
                                value={formData.productName} 
                                placeholder={props.product.ProductName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductDesc">
                            <Form.Label>Product Description:</Form.Label>
                            <Form.Control 
                                type="textarea"
                                name="productDesc"
                                value={formData.productDesc} 
                                placeholder={props.product.ProductDesc}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductStock">
                            <Form.Label>Stock Quantity:</Form.Label>
                            <Form.Control 
                                type="number"
                                name="productStock"
                                value={formData.productStock} 
                                placeholder={props.product.ProductStock}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductPrice">
                            <Form.Label>Product Price:</Form.Label>
                            <Form.Control 
                                type="number"
                                name="productPrice"
                                value={formData.productPrice} 
                                placeholder={props.product.ProductPrice}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductOnSale">
                        <Form.Label>On Sale?</Form.Label>
                            <Form.Check 
                                type="switch" 
                                id="on-sale-switch" 
                                label="On Sale?" 
                                onChange={(e) => setFormData({...formData, onSale: e.target.checked})}
                            />
                        </Form.Group>
                        <Row>
                            <Button type="submit">Update Product</Button>
                        </Row>                     
                    </Form>
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

export default AdminProductModal;