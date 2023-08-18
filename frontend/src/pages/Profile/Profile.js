import './profile.css';
import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

function Profile() {
    const [profileModify, setProfileModify] = useState(false);
    const [userData, setUserData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        street: 'street',
        city: 'lln',
        zip: '1348',
        // Ajoutez d'autres champs ici
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Ajoutez ici la logique pour enregistrer les modifications
        setProfileModify(false); // Une fois enregistré, désactivez le mode modification
    };

    return (
        <div className='profile'>
            <Container className='profile-title page-title'>
                <h2>Profile</h2>
            </Container>
            <Container className='profile-details  text-center'>
                <Form>
                    <Form.Group as={Row} controlId='formFirstName'  className='mt-2'>
                        <Form.Label column sm={2}>Prénom:</Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type='text'
                                value={userData.firstName}
                                readOnly={!profileModify}
                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                // Vous pouvez ajouter une fonction de mise à jour ici
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='formLastName'  className='mt-2'>
                        <Form.Label column sm={2}>Nom:</Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type='text'
                                value={userData.lastName}
                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                readOnly={!profileModify}
                                // Vous pouvez ajouter une fonction de mise à jour ici
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='formEmail'  className='mt-2'>
                        <Form.Label column sm={2}>Email:</Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type='email'
                                value={userData.email}
                                readOnly={!profileModify}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                // Vous pouvez ajouter une fonction de mise à jour ici
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formStreet'  className='mt-2'>
                        <Form.Label column sm={2}>Rue:</Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type='text'
                                value={userData.street}
                                readOnly={!profileModify}
                                onChange={(e) => setUserData({ ...userData, street: e.target.value })}
                                // Vous pouvez ajouter une fonction de mise à jour ici
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formCity'  className='mt-2'>
                        <Form.Label column sm={2}>Ville:</Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type='text'
                                value={userData.city}
                                readOnly={!profileModify}
                                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                // Vous pouvez ajouter une fonction de mise à jour ici
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='formZip'  className='mt-2'>
                        <Form.Label column sm={2}>Code postal:</Form.Label>
                        <Col sm={5}>
                            <Form.Control
                                type='number'
                                value={userData.zip}
                                readOnly={!profileModify}
                                onChange={(e) => setUserData({ ...userData, zip: e.target.value })}
                                // Vous pouvez ajouter une fonction de mise à jour ici
                            />
                        </Col>
                    </Form.Group>
                    {profileModify ?
                        <Button variant='primary' type='submit' disabled={!profileModify} className='mt-2'>
                            Enregistrer
                        </Button>
                        :null}
                </Form>
                {profileModify ? (
                    <Button variant='secondary' onClick={() => setProfileModify(false)} className='mt-2'>
                        Annuler
                    </Button>
                ) : (
                    <Button variant='primary' onClick={() => setProfileModify(true)} className='mt-2'>
                        Modifier
                    </Button>
                )}
            </Container>
        </div>
    );
}

export default Profile;
