import './Profile.css';
import React,  {useEffect, useState} from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import {USER_URL} from "../../components/utils/Constants";

function Profile() {
    const [userData, setUserData] = useState({
        id:0,
        firstName: '',
        userName: '',
        email: '',
        street: '',
        city: '',
        zip: '',
        // Ajoutez d'autres champs ici
    });

    const getInfoProfile = async () => {
        const userId = 1;
        fetch(`${USER_URL}/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUserData(prevData => ({
                    ...prevData,
                    id: data.user.UserID,
                    firstName: data.user.UserFirstname,
                    userName: data.user.UserName,
                    email: data.user.UserEmail,

                }));
                if(data.addresses.length !== 0 ){
                    setUserData(prevData => ({
                        ...prevData,
                        city: data.addresses[0].City,
                        street: data.addresses[0].Street,
                        zip: data.addresses[0].Postcode,

                    }));
                }
                return;
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${USER_URL}/update/${userData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Mise à jour réussie, effectuez des actions nécessaires
                console.log('Mise à jour réussie');
            } else {
                // Gérer les erreurs ici
                console.error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error);
        }
    };

    useEffect(() => {
        getInfoProfile();
    }, []);

    const [profileModify, setProfileModify] = useState(false);
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
                <Form  onSubmit={handleSubmit}>
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
                                value={userData.userName}
                                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
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
