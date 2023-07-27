const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  try {
    const productsQuery = 'SELECT * FROM Products;';
    const rows = await pool.query(productsQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { productName, productStock, productDesc, productPrice, productOnSale } = req.body;

    // Effectuer des validations supplémentaires si nécessaire
    
    // Insérer les données dans la base de données
    const query = 'INSERT INTO Products (ProductName, ProductStock, ProductDesc, ProductPrice, ProductOnSale) VALUES (?, ?, ?, ?, ?)';
    await pool.query(query, [productName, productStock, productDesc, productPrice, productOnSale]);

    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;