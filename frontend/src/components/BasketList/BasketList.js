import './BasketList.css';
import React, {useEffect, useState} from 'react';
import { Container, Card } from 'react-bootstrap';
import Axios from 'axios';
import { BASKET_URL } from '../utils/Constants';

function BasketList() {
    const [basket, setBasket] = useState({});
    //const [basketSubtotal, setBasketSubtotal] = useState(0);

    const getBasket = async () => {
        const userId = 1;
        await Axios.get(`${BASKET_URL}/${userId}`)
        .then((response) => {
            setBasket(response.data);
            console.log(response.data);
        })
    }

    useEffect(() => {
        getBasket();
    }, []);

    return(
        <div className='basketList'>
            <Container className='basketList-list'>
                {Object.keys(basket).length < 1 &&
                    <>
                        <p> Votre panier est vide! </p>
                    </>
                }
                {Object.keys(basket).length >= 1 && 
                    <>
                        <Card className="card bg-secondary text-left">
                            <Card.Body className='card-body basket'>
                                <h5 className="card-title">{basket[0].ProductName} * {basket[0].ItemQuantity}</h5>
                                <p>Subtotal: {basket[0].ProductPrice}€</p>
                            </Card.Body>  
                        </Card>
                    </>
                }
            </Container>
        </div>
    )
}

export default BasketList;