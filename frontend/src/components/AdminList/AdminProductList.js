import React, { useState } from 'react';
import { ListGroup, Col, Row, Button } from 'react-bootstrap';
import AdminProductAdd from './AdminProductAdd.js';

function AdminProductList(props) {
    const [showProductAdd, setShowProductAdd] = useState(false);

    const handleClick = () => {
        setShowProductAdd(!showProductAdd);
    }

    return (
        <>
            {showProductAdd ? (
                <>
                    <AdminProductAdd />
                    {/* Afficher le bouton "Cancel" uniquement lorsque le formulaire est ouvert */}
                    <Button onClick={handleClick}>Cancel</Button>
                </>
            ) : (
                <>
                    {props.products.length > 0 ? (
                        <ListGroup>
                            {props.products.map((product) => (
                                <ListGroup.Item key={product.ProductID}>
                                    <Row>
                                        <Col>{product.ProductName}</Col>
                                        <Col>{product.ProductStock}</Col>
                                        <Col>{product.ProductDesc}</Col>
                                        <Col>{product.ProductPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No products on website!</p>
                    )}

                    {/* Afficher le bouton "Add New Product" uniquement lorsque le formulaire n'est pas ouvert */}
                    {!showProductAdd && (
                        <Button onClick={handleClick}>Add New Product</Button>
                    )}
                </>
            )}
        </>
    );
}

export default AdminProductList;
