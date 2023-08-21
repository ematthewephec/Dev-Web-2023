import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { USER_URL } from '../utils/Constants';

const SignupPage = ({ setIsAuthenticated }) => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleLogin = () => {
            // Effectuer la logique d'authentification ici (appel à l'API, vérification des informations, etc.)
            // Si l'authentification réussit, définissez isAuthenticated sur true
            setIsAuthenticated(true);
        };

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

  const sendForm = (formData) => {
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
    .then((response) => response.json())
    .then(() => {
        window.location.replace('/');
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
            <h2 className="mt-4">{showRegistrationForm ? 'Inscription d\'utilisateur' : 'Déjà inscrit ?'}</h2>
            {!showRegistrationForm ? (
                <div>
            <h3>Connectez vous à votre compte</h3>
            <Form onSubmit={handleLogin} className="mx-auto">
                <Col>
                    <Card border="primary" className="card-sm">
                        <Card.Body className="card-sm">
                            <Form.Group controlId="emailSignIn" className="col-md-4 mx-auto mb-2">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="passwordSingIn" className="col-md-4 mx-auto mb-2">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    className="mb-2"
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
                <Button type="submit"> Se connecter</Button>
                <p className="mt-4">Pas encore inscrit ? <Button onClick={() => setShowRegistrationForm(true)}>S'inscrire</Button></p>
            </Form>
                </div>
                ) : (
                    <div>
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
                                        name="houseNum"
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
            <Button type="submit"type="submit">S'inscrire</Button>
            <p className="mt-4">Déja inscrit ? <Button onClick={() => setShowRegistrationForm(false)}>Connectez vous</Button></p>
        </Form>
                    </div>
                )}
    </>

    );
};

export default SignupPage;
