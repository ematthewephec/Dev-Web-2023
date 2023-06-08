import React from 'react';
import { Button, ListGroup, Col, Row } from 'react-bootstrap';
import AdminProductModal from './AdminProductModal';

function AdminProductList(props) {
    const products = props.products.map((product) => 
        <ListGroup.Item key={product.ProductID}>
            <Row>
                <Col>{product.ProductName}</Col>
                <Col>Stock: {product.ProductStock}</Col>
                <Col>{parseInt(product.ProductPrice).toFixed(2)}€</Col>
                <Col>
                    <AdminProductModal product={product} />
                </Col>
                {product.ProductOnSale ?
                <Col>
                    <Button 
                        onClick={() => props.deleteProduct(product.ProductID)}
                    >
                        Delete Product
                    </Button>
                </Col>
                : <Button>Restore</Button>}
            </Row>
        </ListGroup.Item>
    );
    
    return(
        <>
            {props.products.length > 0 ? (
                <ListGroup>
                    {products}
                </ListGroup>
            ) : (
                <p>No products listed on website!</p>
            )}
        </>
    )
}

export default AdminProductList;