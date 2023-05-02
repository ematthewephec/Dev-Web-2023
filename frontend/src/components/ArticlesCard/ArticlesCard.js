import './ArticlesCard.css';
import React from 'react';  
import {Card, Row, Col, Nav} from 'react-bootstrap';
import {AXIOS_CONFIG, INDEX_URL} from '../utils/Constants';
import NoImg from '../../Assests/NoImg.jpg';

function ArticlesCard(props){
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
                            <Row>
                                <div className='articleslink'>
                                    <span>
                                        {(props.products.ProductPrice)} €
                                    </span>
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