import './Profile.css';
import React,  {useEffect, useState} from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import {USER_URL} from "../../components/utils/Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useNavigate  } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();

    const redirectToLoginPage = () => {
        navigate('/connect');
    };

    const userDataString = Cookies.get('userData');

    const [userData, setUserData] = useState({
        id:0,
        firstName: '',
        userName: '',
        email: '',
        street: '',
        city: '',
        zip: '',
        country:''
        // Ajoutez d'autres champs ici
    });

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        let data = JSON.parse(userDataString);
        userData.id = data.idUser;
    }


    const getInfoProfile = async () => {
        if (userData.id !== 0 && userData.id !== undefined) {
            try {
                const response = await fetch(`${USER_URL}/${userData.id}`);
                const data = await response.json();

                setUserData((prevData) => ({
                    ...prevData,
                    id: data.user.UserID,
                    firstName: data.user.UserFirstname,
                    userName: data.user.UserName,
                    email: data.user.UserEmail,
                }));

                if (data.addresses.length !== 0) {
                    setUserData((prevData) => ({
                        ...prevData,
                        city: data.addresses[0].City,
                        street: data.addresses[0].Street,
                        zip: data.addresses[0].Postcode,
                        country: data.addresses[0].Country,
                    }));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur', error);
            }
        }
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
                setProfileModify(false)
                toast.success(' Mise à jour réussie', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                setProfileModify(false)
                toast.error('Erreur lors de la mise à jour', {
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
        } catch (error) {
            console.error('Erreur lors de la requête', error);
        }
    };

    useEffect(() => {
        userDataString && getInfoProfile();
    }, []);

    const [profileModify, setProfileModify] = useState(false);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Ajoutez ici la logique pour enregistrer les modifications
        setProfileModify(false); // Une fois enregistré, désactivez le mode modification
    };

    return (
        <div>
            <Container className='profile-title page-title'>
                <h2>Mon profil</h2>
            </Container>
            {userData.id == 0 ?
                <Container>
                    <h3>Veuillez vous connecter pour accéder à cette page </h3>
                    <Button className="mt-4" variant="primary" onClick={() => redirectToLoginPage()}>
                        Se connecter
                    </Button>
                </Container>
                :
                <Container style={{alignSelf:'center'}}>
                    <Form  onSubmit={handleSubmit} className="mx-auto">
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
                                    value={userData.street ?? ''}
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
                                    value={userData.city ?? ''}
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
                                    value={userData.zip ?? ''}
                                    readOnly={!profileModify}
                                    onChange={(e) => setUserData({ ...userData, zip: e.target.value })}
                                    // Vous pouvez ajouter une fonction de mise à jour ici
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formCountry'  className='mt-2'>
                            <Form.Label column sm={2}>Pays: </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type='text'
                                    value={userData.country ?? ''}
                                    readOnly={!profileModify}
                                    onChange={(e) => setUserData({ ...userData, country: e.target.value })}
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
            }

            <ToastContainer />
        </div>
    );
}

export default Profile;
