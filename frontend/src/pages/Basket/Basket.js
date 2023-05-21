import React, {useEffect, useState} from 'react';
//import Axios from 'axios';
import {Container, Button} from 'react-bootstrap';
import './Basket.css';
import BasketList from '../../components/BasketList/BasketList';
import { BASKET_URL } from '../../components/utils/Constants';

function Basket() {
    const [basket, setBasket] = useState([]);

    const getBasket = async () => {
        const userId = 1;
        fetch(`${BASKET_URL}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            setBasket(data);
            return;
        })
    }

    const deleteItemFromBasket = (itemIndex) => {
        const userId = 1;
        fetch(`${BASKET_URL}/${userId}`, {
            method: 'DELETE',
            body: itemIndex ? JSON.stringify({
                itemIndex: itemIndex
            }) : null,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(() => {
            getBasket();
        })
    }

    const clearBasket = () => {
        const userId = 1;
        fetch(`${BASKET_URL}/${userId}/clear`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then(() => {
            getBasket();
        })
    }

    useEffect(() => {
        getBasket();
    }, []);

    return(
        <div className="basket">
            <Container className='basket-title page-title'>
                <h2>Panier</h2>
            </Container>
            <Container className='basket-list'>
                <BasketList 
                    basket={basket}
                    removeItem={deleteItemFromBasket}
                    clearBasket={clearBasket}
                />
            </Container>
        </div>    
    );
}

export default Basket;
