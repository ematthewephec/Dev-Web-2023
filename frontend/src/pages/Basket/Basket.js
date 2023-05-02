import React, {useEffect, useState} from 'react';
//import Axios from 'axios';
import {Container} from 'react-bootstrap';
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

    useEffect(() => {
        getBasket();
    }, []);

    return(
        <div className="basket">
            <Container className='basket-title page-title'>
                <h2>Panier</h2>
            </Container>
            <Container className='basket-list'>
                <BasketList basket={basket}/>
            </Container>
        </div>    
    );
}

export default Basket;
