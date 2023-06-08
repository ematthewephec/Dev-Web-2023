const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  try {
    const productsQuery = 'SELECT * FROM Products WHERE ProductOnSale=True;';
    const rows = await pool.query(productsQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const {productName, productDesc, productStock, productPrice, productOnSale} = req.body;
    const checkProductQuery = 'SELECT * FROM Products WHERE ProductID=?';
    const productRows = await pool.query(checkProductQuery, req.params.id);

    if (productRows.length > 0) {
      const addProductQuery = 'INSERT INTO PRODUCTS(ProductName, ProductStock, ProductDesc, \
        ProductPrice, ProductOnSale) VALUES (?,?,?,?,?)';
      const addProductResult = await pool.query(addProductQuery, [productName, productStock, productDesc, productPrice, productOnSale]);
      addProductResult.affectedRows === 0 ?
      res.status(400).send('Product not added.'):
      res.status(200).send('Product added to database!');
    } else {
      const productId = productRows[0].ProductID
      const modifyProductQuery = 'UPDATE Products SET ProductName=?, \
      ProductStock=?, ProductDesc=?, ProductPrice=?, ProductOnSale=?\
      WHERE ProductID=?';
      const modifyProductResult = await pool.query(modifyProductQuery, [productName, productStock, productDesc, productPrice, productOnSale, productId]);
      res.status(200).send('Product updated in database!');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productsQuery = 'UPDATE Products SET ProductOnSale=False WHERE ProductID=?;';
    const productRows = await pool.query(productsQuery, productId);
    
    if (productRows.length === 0) {
      res.status(404).json({message: 'Product not found.'});
    } else {
        const patchProductQuery = 'UPDATE Product SET ProductOnSale WHERE ProductID=?';
        const result = await pool.query(patchUserQuery, productId);
        res.status(200).json({message: 'Product successfully removed from shop.'});
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;