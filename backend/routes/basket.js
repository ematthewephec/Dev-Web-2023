const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', (req, res) => {
    res.status(200).send("This is the basket route of the API!");
});

router.get('/:userId', async(req, res) => {
    const userId = req.params.userId;
    const basketQuery = 'SELECT ItemIndex, Products.ProductName, \
    Products.ProductPrice, ItemQuantity \
    FROM Baskets INNER JOIN Users ON Baskets.UserID=Users.UserID INNER JOIN \
    Products ON Baskets.ProductID=Products.ProductID WHERE Baskets.UserID=?';
    const result = await pool.query(basketQuery, userId);
    res.status(200).json(result);
});


module.exports = router;