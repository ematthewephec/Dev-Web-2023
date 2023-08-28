import './ArticlesCard.css';
import React from 'react';
import {Card, Row, Col, Nav, Button} from 'react-bootstrap';
import {AXIOS_CONFIG, INDEX_URL, BASKET_URL} from '../utils/Constants';
import NoImg from '../../Assests/NoImg.jpg';
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';

function ArticlesCard(props){
    const userDataString = Cookies.get('userData');
    let userData = null; // Initialisez userData avec null par défaut

    if (userDataString) {
        // Convertissez la chaîne JSON en objet si userDataString n'est pas undefined
        userData = JSON.parse(userDataString);
    }
    function addToLocalCart(itemId, productName, productPrice, quantity) {
        const cart = JSON.parse(localStorage.getItem('localCart')) || [];
        const itemIndex = Date.now() + Math.random().toString(36).substr(2, 9);
        const newItem = {
            ItemIndex: itemIndex,
            itemId: itemId,
            ProductName: productName,
            ProductPrice: productPrice,
            ItemQuantity: quantity
        };
        cart.push(newItem);
        localStorage.setItem('localCart', JSON.stringify(cart));
        toast.success('Produit ajouté au panier avec succès!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }
    const [imageSrc, setImageSrc] = React.useState(null);

    React.useEffect(() => {
        if (props.products.ImageData) {
            const arrayBufferView = new Uint8Array(props.products.ImageData.data);
            const blob = new Blob([arrayBufferView], { type: props.products.ImageType });
            const urlCreator = window.URL;
            const imageUrl = urlCreator.createObjectURL(blob);
            setImageSrc(imageUrl);
        }
    }, [props.products.ImageData, props.products.ImageType]);

//     function addBasket (){
//         const productId = props.products.ProductID;
//         const quantity = 1;
//         const userId = 1;
//         fetch(BASKET_URL + `/add/${userId}/${productId}/${quantity}`, {
//            method: 'POST',
//         })
//     }

    const  addBasket = async () =>  {
        if(userData){
            const productId = props.products.ProductID;
            const quantity = 1;
            const userId = userData.idUser;
            try {
                const response = await fetch(BASKET_URL + `/add/${userId}/${productId}/${quantity}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    toast.success('Produit ajouté au panier avec succès!', {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    toast.error('Une erreur est survenue lors de l\'ajout au panier.', {
                        position: 'top-right',
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
            } catch (error) {
                console.error('Une erreur s\'est produite:', error);
            }
        }
        else{
            const product = props.products;
            addToLocalCart(product.ProductID, product.ProductName, product.ProductPrice, 1);
        }

    };

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
                            <Row className='cardInfo'>
                                <div className='articleslink'>
                                    <span>
                                        {(props.products.ProductPrice)} €
                                    </span>
                                </div>
                                <div className='btnBasket'>
                                    <Button onClick={addBasket}>Ajouter au panier</Button>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                            {imageSrc ? (
                                <img src={imageSrc} className="articlesimg" alt={props.products.ProductName} />
                            ) : (
                                <img src={NoImg} className="articlesimg" alt="No Images" />
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default ArticlesCard;
