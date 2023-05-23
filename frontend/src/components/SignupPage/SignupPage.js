import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { USER_URL } from '../utils/Constants';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    postalCode: '',
    streetNumber: '',
    country: '',
  });

  const sendForm = async (formData) => {
    fetch(`${USER_URL}`, {
        method: 'POST',
        body: formData ? JSON.stringify({
            credentials: {
                username: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password
            },
            addressInfo: {
                street: `${formData.address} ${formData.streetNumber}`,
                postalCode: formData.postalCode,
                country: formData.country
            }
        }) : null,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        if(!response) return;
        window.location.href('/');
    })
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Faites quelque chose avec les données d'inscription, par exemple envoyer une requête au serveur
    console.log(formData);
    // Réinitialisez les champs du formulaire
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      houseNum: '',
      postalCode: '',
      country: '',
    });
    sendForm(formData);
  };

  return (
    <>
        <h1>Inscription d'user</h1>
        <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>

                        <Card border="primary">

                        <Card.Header>Détailles personnelles</Card.Header>

                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group controlId="firstName">
                                    <Form.Label>Prénom:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="lastName">
                                    <Form.Label>Nom:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            </Form.Group>

                            <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            </Form.Group>

                        </Card.Body>

                        </Card>

                    </Col>
                    <Col>
                        <Card border="primary">
                        <Card.Header>Adresse de domiciliation</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group controlId="address">
                                    <Form.Label>Adresse:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="houseNumber">
                                    <Form.Label>Numero:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="houseNumber"
                                        value={formData.houseNum}
                                        onChange={handleChange}
                                        required
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form.Group controlId="postalCode">
                                <Form.Label>Code postal:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="country">
                                <Form.Label>Pays:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                                </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                        </Card>

                    </Col>
                </Row>
            <Button variant="outline-primary" size="sm" type="submit">S'inscrire</Button>
        </Form>  
    </>
    );
};

export default SignupPage;