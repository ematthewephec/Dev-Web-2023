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
router.post('/add/:userId/:productId/:quantity', async(req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    const basketQuery = 'INSERT INTO Baskets (UserID, ProductID, ItemQuantity) VALUES (?, ?, ?)';
    const result = await pool.query(basketQuery, ['1', productId, '1']);
    res.status(200).json(result);
});

router.delete('/:userId', async(req, res) => {
    const userId = req.params.userId;
    const itemIndex = req.body.itemIndex;
    const basketQuery = 'DELETE FROM Baskets WHERE UserID=? AND ItemIndex=?';
    const result = await pool.query(basketQuery, [userId, itemIndex]);
    res.status(200).json(result);
})

module.exports = router;