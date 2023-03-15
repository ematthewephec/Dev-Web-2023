import React, {useEffect, useState} from 'react';
import Axios from 'axios';
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
            <h1 className="title front-page">Bienvenue chez Informateur</h1>
            <div className="card">
                <div className="card-body">
                    <p className="card-body">
                        {title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default IndexPage;
