import React from 'react';
import {Col, Row} from 'react-bootstrap';
import SignupPage from '../../components/SignupPage/SignupPage';
import LoginPage from '../../components/LoginPage/LoginPage';

function Connections(){
    return(
        <>
            <Row>
                <Col>
                    <SignupPage/>
                </Col>
                <Col>
                    <LoginPage/>
                </Col>
            </Row>
        </>
    )
}

export default Connections;