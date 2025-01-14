const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const {toFloat} = require("validator");

router.get('/', (req, res) => {
    res.status(200).send("This is the basket route of the API!");
});

router.get('/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const basketQuery = 'SELECT ItemIndex, Products.ProductName, \
        Products.ProductPrice, ItemQuantity \
        FROM Baskets INNER JOIN Users ON Baskets.UserID=Users.UserID INNER JOIN \
        Products ON Baskets.ProductID=Products.ProductID WHERE Baskets.UserID=?';
        const result = await pool.query(basketQuery, userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).send('User not found!');
    }
});
router.post('/add/:userId/:productId/:quantity', async(req, res) => {
    const {userId, productId, quantity} = req.params;
    const basketQuery = 'INSERT INTO Baskets (UserID, ProductID, ItemQuantity) VALUES (?, ?, ?)';
    const result = await pool.query(basketQuery, [userId, productId, '1']);
    res.status(200).json(result);
});

router.delete('/:userId', async(req, res) => {
    try{
        const userId = req.params.userId;
        const itemIndex = req.body.itemIndex;
        const basketQuery = 'DELETE FROM Baskets WHERE UserID=? AND ItemIndex=?';
        const result = await pool.query(basketQuery, [userId, itemIndex]);
        result.affectedRows === 0 ?
            (await pool.query('SELECT * FROM Users WHERE UserID=?', userId)).length === 0 ?
            res.status(404).send('User not found!') :
            res.status(404).send('Item not found!') :
            res.status(200).json(result);
    } catch (err) {
        res.status(404).send('Not found!');
    }
})

router.delete('/:userId/clear', async(req, res) => {
    try {
        const userId = req.params.userId;
        const basketQuery = 'DELETE FROM Baskets WHERE UserID=?';
        const result = await pool.query(basketQuery, userId);
        result.affectedRows === 0 ?
            (await pool.query('SELECT * FROM Users WHERE UserID=?', userId)).length === 0 ?
            res.status(404).send('User not found!') :
            res.status(404).send('No items found in basket!') :
            res.status(200).json(result);
    } catch (err) {
        res.status(404).send('Not found!');
    }
})

router.post('/validate', async(req, res) => {
    try {
        const userId = req.body.id;

        const createOrderQuery = 'INSERT INTO Orders (UserID, OrderSubtotal, OrderDate) VALUES (?, ?, ?)';
        const createOrderResult = await pool.query(createOrderQuery, [userId, 0,req.body.orderDate]); // Initial price total
        const orderId = createOrderResult.insertId;

        const basketQuery = 'SELECT * FROM Baskets WHERE UserID = ?';
        const basketResult = await pool.query(basketQuery, [userId]);
        const basketItems = basketResult[0];
        const currentDateTime = new Date().toISOString();

        let totalPrice = 0; // Initialize total price

        for (const item of basketResult) {
            const insertOrderArticleQuery = 'INSERT INTO OrderArticle (OrderID, ProductID) VALUES (?, ?)';
            await pool.query(insertOrderArticleQuery, [orderId, item.ProductID]);

            const getProductPriceQuery = 'SELECT ProductPrice FROM Products WHERE ProductID = ?';
            const productPriceResult = await pool.query(getProductPriceQuery, [item.ProductID]);
            const productPrice = toFloat(productPriceResult[0].ProductPrice);

            totalPrice += productPrice;
       }

        const updatePriceQuery = 'UPDATE Orders SET OrderSubtotal = ? WHERE OrderID = ?';
        await pool.query(updatePriceQuery, [totalPrice, orderId]);

        const empyBasket = 'DELETE FROM Baskets WHERE UserID=?';
        const result = await pool.query(empyBasket, userId);

        res.status(200).json({ message: 'Basket validated and orders created.'});
    } catch (err) {
        res.status(404).send('Not found!');
    }
})

module.exports = router;
