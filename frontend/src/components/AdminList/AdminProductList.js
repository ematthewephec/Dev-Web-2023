import React, { useState } from 'react';
import { ListGroup, Col, Row, Button } from 'react-bootstrap';
import AdminProductAdd from './AdminProductAdd.js';

function AdminProductList(props) {

    const [showProductAdd, setShowProductAdd] = useState(false);
    const [showproductList, setShowProductList] = useState(true);

    const handleClick = () => {
        setShowProductAdd(!showProductAdd);
        setShowProductList(!showproductList);
    }

    const products = props.products.map((product) => 
    <>
        {showproductList ? (
        <ListGroup.Item key={product.ProductID}>
            <Row>
                <Col>{product.ProductName}</Col>
                <Col>{product.ProductStock}</Col>
                <Col>{product.ProductDesc}</Col>
                <Col>{product.ProductPrice}</Col> 
            </Row>
        </ListGroup.Item>
        ) : (
        <></>
        )}
        {!showProductAdd ? (
        <Button onClick={handleClick}>Add New Product</Button>
        ) : (
        <AdminProductAdd />
        )}
        {showProductAdd ? (
            <Button onClick={handleClick}>Cancel</Button>
        ) : (
            <></>
        )}
    </>


    );
    
    return(
        <>
            {props.products.length > 0 ? (
                <ListGroup>
                    {products}
                </ListGroup>
            ) : (
                <p>No products on website!</p>
            )}
        </>
    )
}

export default AdminProductList;