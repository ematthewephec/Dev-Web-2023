import React,  {useEffect, useState} from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import {USER_URL} from "../../components/utils/Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useNavigate  } from 'react-router-dom';

function Orders() {

    const navigate = useNavigate();

    const redirectToLoginPage = () => {
        navigate('/connect');
    };

    const reditrectHome = () => {
        navigate('/');
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


    return (
        <div>
            <Container className='profile-title page-title'>
                <h2>Mes commandes</h2>
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
                    <h2>MEs commandes</h2>
                </Container>
            }

            <ToastContainer />
        </div>
    );
}

export default Orders;
