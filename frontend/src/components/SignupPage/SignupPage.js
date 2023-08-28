import React, {useState } from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {USER_URL} from '../utils/Constants';
import { useAuth } from '../Auth/Auth';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; // Importez js-cookie

const SignupPage = () => {

    const { user, login } = useAuth();
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }

    const handleLogout = () => {
        // Supprimez le cookie et réinitialisez l'utilisateur
        userData = null;
        Cookies.remove('userData');
        toast.success('Vous êtes Déconnecter', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        window.location.reload();
    };

    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire

        fetch(`${USER_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    // Si le jeton d'authentification est renvoyé dans la réponse
                    toast.success('Vous êtes connecter', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    login(data.token);
                    const userData = {
                        idUser:data.userId,
                        token: data.token,
                        lastName: data.lastName,
                        firstName: data.firstName
                    };

                    // Enregistrez l'objet JSON dans un cookie sécurisé
                    Cookies.set('userData', JSON.stringify(userData), { secure: true, sameSite: 'strict', expires: 7 }); // Exemple : expiration dans 7 jours
                } else {
                    toast.error('Vos identifiants semblent incorrects', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            })
            .catch((error) => {
                toast.error('Une erreur est survenue', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
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
        city:''
    });

    const sendForm = (formData) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.password)) {
            // Le mot de passe ne répond pas aux critères, affichez un message d'erreur
            toast.error('Le mot de passe doit avoir au moins 8 caractères, une majuscule, un caractère spécial et un chiffre', {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }
        fetch(`${USER_URL}`, {
            method: 'POST',
            body: formData ? JSON.stringify({
                credentials: {
                    username: formData.lastName,
                    firstname: formData.firstName,
                    email: formData.email,
                    password: formData.password
                },
                addressInfo: {
                    street: `${formData.address} ${formData.streetNumber}`,
                    postalCode: formData.postalCode,
                    country: formData.country,
                    city: formData.city
                }
            }) : null,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur lors de la création du compte');
                }
            })
            .then(() => {
                toast.success('Compte créé, veuillez vous connecter', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                toast.error('Erreur lors de la création du compte', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Faites quelque chose avec les données d'inscription, par exemple envoyer une requête au serveur
        // Faites quelque chose avec les données d'inscription, par exemple envoyer une requête au serveur
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
            city:''
        });
        sendForm(formData);
    };

    return (
        <>
            {userData?
                <div className="mt-4">
                    <h3>Vous êtes connectez en tant que {userData.firstName} {userData.lastName} </h3>
                    <Button onClick={handleLogout} className="mt-4"> Déconnexion </Button>
                </div>

                :
                        <div>
                            <h2 className="mt-4">{showRegistrationForm ? 'Inscription d\'utilisateur' : 'Déjà inscrit ?'}</h2>
                            {!showRegistrationForm ? (
                                <div>
                                    <h3>Connectez vous à votre compte</h3>
                                    <Form onSubmit={(e) => handleLogin(e)} className="mx-auto">
                                        <Col>
                                            <Card border="primary" className="card-sm">
                                                <Card.Body className="card-sm">
                                                    <Form.Group controlId="emailSignIn" className="col-md-4 mx-auto mb-2">
                                                        <Form.Label>Email:</Form.Label>
                                                        <Form.Control
                                                            className="mb-2"
                                                            type="email"
                                                            name="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId="passwordSingIn" className="col-md-4 mx-auto mb-2">
                                                        <Form.Label>Password:</Form.Label>
                                                        <Form.Control
                                                            className="mb-2"
                                                            type="password"
                                                            name="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Card.Body>

                                            </Card>

                                        </Col>
                                        <Button type="submit"> Se connecter</Button>
                                        <p className="mt-4">Pas encore inscrit ? <Button
                                            onClick={() => setShowRegistrationForm(true)}>S'inscrire</Button></p>
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
                                                            <Col>
                                                                <Form.Group controlId="city">
                                                                    <Form.Label>Ville:</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="city"
                                                                        value={formData.city}
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
                                        <Button type="submit">S'inscrire</Button>
                                        <p className="mt-4">Déja inscrit ? <Button
                                            onClick={() => setShowRegistrationForm(false)}>Connectez vous</Button></p>
                                    </Form>
                                </div>
                            )}
                        </div>
            }

            <ToastContainer/>
        </>
    );
};

export default SignupPage;
