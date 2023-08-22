import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {INDEX_URL} from '../utils/Constants';
import Cookies from "js-cookie";
//import './FrontPage.css';

function IndexPage(){
    const [title, setTitle] = useState("");

    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }


    const getIndexHello = async () => {
        fetch(`${INDEX_URL}`)
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
                    <Card.Title>Bienvenue chez Informateur   {userData ? (userData.firstName ? userData.firstName : '') + (userData.lastName ? ' ' + userData.lastName : '') : ''}</Card.Title>
                    <Card.Text>
                        {title}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default IndexPage;
