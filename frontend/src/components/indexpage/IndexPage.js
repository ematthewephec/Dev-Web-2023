import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import {AXIOS_CONFIG, INDEX_URL} from '../utils/Constants';
//import './FrontPage.css';

function IndexPage(){
    const [title, setTitle] = useState("");

    const getIndexHello = async () => {
        Axios.get(INDEX_URL)
        .then((response) => {
            setTitle(response.data)
        });
    };

    useEffect(() => {
        getIndexHello();
    }, []);
    
    return(
        <div className="App front-page">
            <Card>
                <Card.Body>
                    <Card.Title>Bienvenue chez Informateur</Card.Title>
                    <Card.Text>
                        {title}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default IndexPage;
