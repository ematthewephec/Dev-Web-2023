import './ArticlesCard.css';
import React from 'react';
import {Card, Row, Col, Nav, Button} from 'react-bootstrap';
import {AXIOS_CONFIG, INDEX_URL, BASKET_URL} from '../utils/Constants';
import NoImg from '../../Assests/NoImg.jpg';
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';

function ArticlesCard(props){
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }

    const  addBasket = async () =>  {
        const productId = props.products.ProductID;
        const quantity = 1;
        const userId = userData.idUser;
        try {
            const response = await fetch(BASKET_URL + `/add/${userId}/${productId}/${quantity}`, {
                method: 'POST',
            });

            if (response.ok) {
                toast.success('Produit ajouté au panier avec succès!', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                toast.error('Une erreur est survenue lors de l\'ajout au panier.', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }
    };

    return(
        <div className='articlescard'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <div className='articlestitle'>
                                    <span>
                                        <h3>{props.products.ProductName}</h3>
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className='articlesresum'>
                                    <span>
                                        {(props.products.ProductDesc)}
                                    </span>
                                </div>
                            </Row>
                            <Row className='cardInfo'>
                                <div className='articleslink'>
                                    <span>
                                        {(props.products.ProductPrice)} €
                                    </span>
                                </div>
                                <div className='btnBasket'>
                                    <Button onClick={addBasket}>Ajouter au panier</Button>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                            <img src={NoImg} className='articlesimg' alt='No Images'></img>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default ArticlesCard;
