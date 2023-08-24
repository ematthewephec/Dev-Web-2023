import React, { useState } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { PRODUCT_URL } from '../utils/Constants';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productStock: '',
    productDesc: '',
    productPrice: '',
    productOnSale: '1',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(selectedImage);
    //console.log(formData);

    const formDataWithImage = new FormData();
    formDataWithImage.append('productName', formData.productName);
    formDataWithImage.append('productStock', formData.productStock);
    formDataWithImage.append('productDesc', formData.productDesc);
    formDataWithImage.append('productPrice', formData.productPrice);
    formDataWithImage.append('productOnSale', formData.productOnSale);
    formDataWithImage.append('image', selectedImage);

    try {
      const response = await fetch(PRODUCT_URL, {
        method: 'POST',
        body: formDataWithImage,
      });

      if (response.ok) {
        window.location.replace('/admin');
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
                    <Form.Group controlId="productImage">
                      <Form.Label>Image du produit</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept=".jpg, .jpeg, .png"
                      />
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