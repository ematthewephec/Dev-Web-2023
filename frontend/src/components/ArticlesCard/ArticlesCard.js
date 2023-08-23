import './ArticlesCard.css';
import React from 'react';
import {Card, Row, Col, Nav, Button} from 'react-bootstrap';
import {AXIOS_CONFIG, INDEX_URL, BASKET_URL} from '../utils/Constants';
import NoImg from '../../Assests/NoImg.jpg';
import Cookies from "js-cookie";

function ArticlesCard(props){
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }

    function addBasket (){
        console.log(userData)
        const productId = props.products.ProductID;
        const quantity = 1;
        const userId = userData.idUser;
        fetch(BASKET_URL + `/add/${userId}/${productId}/${quantity}`, {
           method: 'POST',
        })
    }
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
        </div>
    )
}

export default ArticlesCard;
