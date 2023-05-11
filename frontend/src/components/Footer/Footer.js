import './Footer.css';
import react from 'react';
import React,{ useRef, useEffect } from 'react';
import { Navbar, Container, Col, Row } from 'react-bootstrap';

import logo from '../../Assests/Logo.jpg';
import twitter from '../../Assests/twitter.svg';
import facebook from '../../Assests/facebook.svg';
import instagram from '../../Assests/instagram.svg';
import youtube from '../../Assests/youtube.svg';
import tiktok from '../../Assests/tiktok.svg';

function Footer() {
    return (
        <Footer className="footer">
            <Container>
                <Col>
                    <img
                        src={logo}
                        alt="Informateur"
                        title="Informateur"
                        height="50"
                    />
                </Col>
                <Col>
                    <Row>
                        <Col>
                        <img src={twitter} alt='twiter' height={25}/>
                        </Col>
                        <Col>
                        <img src={instagram} alt='instagram' height={25}/>
                        </Col>
                        <Col>
                        <img src={facebook} alt='facebook' height={25}/>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <img src={youtube} alt='youtube' height={25}/>
                        </Col>
                        <Col>
                        <img src={tiktok} alt='tiktok' height={25}/>
                        </Col>
                    </Row>
                </Col>

            </Container>
        </Footer>
    )
}

export default Footer;