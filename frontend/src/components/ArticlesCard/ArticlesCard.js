import './ArticlesCard.css';
import {Card, Row, Col, Nav} from 'react-bootstrap';
import NoImg from '../../Assests/NoImg.jpg';

function ArticlesCard(){
    return(
        <div className='articlescard'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <div className='articlestitle'>
                                    <span>
                                        <h3>Articles Title</h3>
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className='articlesresum'>
                                    <span>
                                        Lorem ipsum dolor sit amet. Et facere esse sit nostrum illo sit rerum delectus ut repellat doloribus non doloribus galisum ut consectetur excepturi et labore quas. Ut quaerat nesciunt non quaerat voluptatibus sit doloremque consequatur!
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className='articleslink'>
                                    <span>
                                        <Nav.Link href='#'>{'Read more'}</Nav.Link>
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