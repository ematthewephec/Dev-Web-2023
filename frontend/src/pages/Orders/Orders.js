import './orders.css';
import React,  {useEffect, useState} from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import {ORDERS_URL, USER_URL} from "../../components/utils/Constants";
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
    const [ordersData, setOrdersData] = useState([]);

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

    const getOrders = async () => {
        try {
            console.log(userData.id)
            const response = await fetch(`${ORDERS_URL}/getOrders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userData.id }),
            });

            if (response.ok) {
                const orders = await response.json();
                setOrdersData(orders)
                // Traiter les données des commandes reçues du serveur, par exemple, les afficher
                console.log('Commandes:', orders);

            }

        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }

    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        getOrders()
    }, []);


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
                <div className="container mt-5">
                    <h2 className="mb-4">Récapitulatif des Commandes</h2>
                    <div className="table-scroll">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Commandes</th>
                            <th>Date de commande</th>
                            <th>Produit</th>
                            <th>Nom</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ordersData.map((order, index) => (
                            <tr key={index}>
                                <td>#{order.OrderID}</td>
                                <td>{formatDate(order.OrderDate)}</td>
                                <td>#{order.ProductID}</td>
                                <td>{order.ProductName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            }

            <ToastContainer />
        </div>
    );
}

export default Orders;
