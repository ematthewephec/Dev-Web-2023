import React from 'react';
import {Container} from 'react-bootstrap';
import './Basket.css';
import BasketList from '../../components/BasketList/BasketList';

function Basket() {
    return(
        <div className="basket">
            <Container className='basket-title page-title'>
                <h2>Panier</h2>
            </Container>
            <Container className='basket-list'>
                <BasketList />
            </Container>
        </div>    
    );
}

export default Basket;
