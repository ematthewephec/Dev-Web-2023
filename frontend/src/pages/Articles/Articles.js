import './Articles.css';
import React, {useEffect, useState} from 'react';
import ArticlesCard from '../../components/ArticlesCard/ArticlesCard';
import {Container, Row, Col, Button } from 'react-bootstrap';
import { PRODUCT_URL } from '../../components/utils/Constants';
import Footer from '../../components/Footer/Footer';



function Articles(){
    const [Articles, setArticles] = useState([]);


    function getArticles (offset = 0,limit = 20) {

        fetch(PRODUCT_URL)
            .then((response) => response.json())
            .then((data) => {
                if (offset === 0) {
                    setArticles(data)
                    return
                }
                setArticles(Articles => [...Articles, ...data])
            });
    }

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div className='articles'>
            <Container className='articles-title page-title'>
                <h2>Articles</h2>
            </Container>
            <Container className='articles-list'>
                {
                    Articles.map((article, index) => {
                        return (
                            <Col key={index} >
                                <ArticlesCard key={index} products = {article}/>
                            </Col>                           
                        )
                    })
                }
            </Container>
            
        </div>
    );
}

export default Articles;