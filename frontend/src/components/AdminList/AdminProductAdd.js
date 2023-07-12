import React, { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { PRODUCT_URL } from "../utils/Constants";

const AddProduct = () => {
    
    const [formData, setFormData] = useState({
        productName: '',
        productStock: '',
        productDesc: '',
        productPrice: '',
        productOnSale: '',
        imageName: '',
        imageSize: '',
        imageType: '',
        imageData: '',
      });
    
    const sendForm = (formData) => {
        fetch(`${PRODUCT_URL}`, {
            method: 'POST',
            body: formData ? JSON.stringify({
                productName: formData.productName,
                productStock: formData.productStock,
                productDesc: formData.productDesc,
                productPrice: formData.productPrice,
                productOnSale: formData.productOnSale,
                imageName: formData.imageName,
                imageSize: formData.imageSize,
                imageType: formData.imageType,
                imageData: formData.imageData
            }) : null,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(() => {
            window.location.replace('/');
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        setFormData({
            productName: '',
            productStock: '',
            productDesc: '',
            productPrice: '',
            productOnSale: '',
            imageName: '',
            imageSize: '',
            imageType: '',
            imageData: '',
        });
        sendForm(formData);
    };

    return (
        <>
            <h1>Ajouter un produit</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName">
                    <Form.Label>Nom du produit</Form.Label>
                    <Form.Control
                        type="text"
                        name="productName"
                        placeholder="Nom du produit"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="productStock">
                    <Form.Label>Stock du produit</Form.Label>
                    <Form.Control
                        type="number"
                        name="productStock"
                        placeholder="Stock du produit"
                        value={formData.productStock}
                        onChange={handleChange}
                        />  
                </Form.Group>
                <Form.Group controlId="productDesc">
                    <Form.Label>Description du produit</Form.Label>
                    <Form.Control
                        type="text"
                        name="productDesc"
                        placeholder="Description du produit"
                        value={formData.productDesc}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>   
                <Form.Group controlId="productPrice">
                    <Form.Label>Prix du produit</Form.Label>
                    <Form.Control
                        type="number"
                        name="productPrice"
                        placeholder="Prix du produit"
                        value={formData.productPrice}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="productOnSale">
                    <Form.Label>En solde ?</Form.Label>
                    <Form.Select
                        type="boolean"
                        name="productOnSale"
                        placeholder="En solde ?"
                        value={formData.productOnSale}
                        onChange={handleChange}
                        required
                    >
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image du produit</Form.Label>
                    <input type="file-upload" name="image" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ajouter le produit
                </Button>
            </Form>
        </>
    );
};
export default AddProduct;