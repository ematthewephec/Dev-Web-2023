import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { SESSION_URL } from '../utils/Constants';
import { CookieSetter } from '../utils/CookieSetter';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const sendForm = (formData) => {
    fetch(`${SESSION_URL}`, {
        method: 'POST',
        body: formData ? JSON.stringify({
            email: formData.email,
            password: formData.password
        }) : null,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        const Cookie = () => {
            return <CookieSetter 
                name="access-token"
                value={data.token}
            />
        }
        window.location.replace('/');
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Faites quelque chose avec les données d'inscription, par exemple envoyer une requête au serveur
    // Réinitialisez les champs du formulaire
    setFormData({
      email: '',
      password: '',
    });
    sendForm(formData);
  };

  return (
    <>
        <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>

                        <Card border="primary">

                        <Card.Header>Inscription d'user</Card.Header>

                        <Card.Body>
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

                </Row>
            <Button variant="outline-primary" size="sm" type="submit">Se connecter</Button>
        </Form>  
    </>
    );
};

export default LoginPage;