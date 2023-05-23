import './Footer.css';
import React, { useRef, useEffect } from 'react';
import { Navbar, Container, Col, Row } from 'react-bootstrap';

import logo from '../../Assests/Logo.jpg';
import twitter from '../../Assests/twitter.svg';
import facebook from '../../Assests/facebook-svgrepo-com.svg';
import instagram from '../../Assests/instagram.svg';
import youtube from '../../Assests/youtube.svg';
import tiktok from '../../Assests/tiktok.svg';

function Footer() {
    return (
        <footer className="footer"> 
            <Container>
                <Col className="logo">
                    <img
                        src={logo}
                        alt="Informateur"
                        title="Informateur"
                        height="75"
                    />
                </Col>
                <Col className="social-media">
                    <Row>
                        <Col>
                            <img src={twitter} alt='twiter' height={40} />
                        </Col>
                        <Col>
                            <img src={instagram} alt='instagram' height={40} />
                        </Col>
                        <Col>
                            <img src={facebook} alt='facebook' height={40} />
                        </Col>
                        <Col>
                            <img src={youtube} alt='youtube' height={40} />
                        </Col>
                        <Col>
                            <img src={tiktok} alt='tiktok' height={40} />
                        </Col>
                    </Row>
                </Col>
            </Container>
        </footer>
    )
}

export default Footer;
