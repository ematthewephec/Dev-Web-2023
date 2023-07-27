import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { PRODUCT_URL } from '../utils/Constants';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productStock: '',
        productDesc: '',
        productPrice: '',
        productOnSale: '',
    });

    const NewProduct = (formData) => {
        fetch(`${PRODUCT_URL}`, {
            method: 'POST',
            body: formData ? JSON.stringify({
                productName: `${formData.productName}`,
                productStock: formData.productStock,
                productDesc: formData.productDesc,
                productPrice: formData.productPrice,
                productOnSale: formData.productOnSale
            }) : null,
            headers: {
                'Content-Type': 'application/json',
            }
        })  
        .then((response) => response.json())
        .then(() => {
            window.location.replace('/admin');
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        setFormData({
            productName: '',
            productStock: '',
            productDesc: '',
            productPrice: '',
            productOnSale: '',
        });
        NewProduct(formData);
    };

  return (
    <>
      <h1>Ajouter un produit</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card border="primary">
              <Card.Header>Informations Produit</Card.Header>

              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group controlId="productName">
                      <Form.Label>Nom du produit</Form.Label>
                      <Form.Control
                        type="text"
                        name="productName"
                        placeholder="Nom du produit"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="productStock">
                      <Form.Label>Stock du produit</Form.Label>
                      <Form.Control
                        type="number"
                        name="productStock"
                        placeholder="Stock du produit"
                        value={formData.productStock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="productDesc">
                      <Form.Label>Description du produit</Form.Label>
                      <Form.Control
                        type="text"
                        name="productDesc"
                        placeholder="Description du produit"
                        value={formData.productDesc}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="productPrice">
                      <Form.Label>Prix du produit</Form.Label>
                      <Form.Control
                        type="number"
                        name="productPrice"
                        placeholder="Prix du produit"
                        value={formData.productPrice}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="productOnSale">
                      <Form.Label>En vente ?</Form.Label>
                      <Form.Select
                        type="boolean"
                        name="productOnSale"
                        placeholder="En vente ?"
                        value={formData.productOnSale}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">Oui</option>
                        <option value="2">Non</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        

        <Button variant="primary" type="submit">
          Ajouter le produit
        </Button>
      </Form>
    </>
  );
};

export default AddProduct;
