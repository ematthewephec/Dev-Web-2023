const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', (req, res) => {
    res.status(200).send("This is the order route of the API!");
});

router.post('/getOrders', async(req, res) => {
    try {
        const userId = req.body.id;

        // Obtenir les commandes de l'utilisateur
        const ordersQuery = 'SELECT * FROM Orders WHERE UserID=?';
        const ordersResult = await pool.query(ordersQuery, userId);

        const ordersWithArticles = [];

        // Pour chaque commande de l'utilisateur
        for (const order of ordersResult) {
            const orderArticleQuery = `
            SELECT OrderArticle.ProductID, Products.ProductName, Orders.OrderDate 
            FROM OrderArticle 
            INNER JOIN Orders ON OrderArticle.OrderID = Orders.OrderID 
            INNER JOIN Products ON OrderArticle.ProductID = Products.ProductID 
            WHERE Orders.UserID=?
        `;
            const orderArticlesResult = await pool.query(orderArticleQuery, userId);

            // Ajouter les informations à l'array
            for (const article of orderArticlesResult) {
                ordersWithArticles.push({
                    OrderID: order.OrderID,
                    ProductID: article.ProductID,
                    ProductName: article.ProductName,
                    OrderDate: order.OrderDate,
                });
            }
        }

        res.status(200).json(ordersWithArticles);
    } catch (err) {
        res.status(404).send('User not found!');
    }
});
// router.post('/add/:userId/:productId/:quantity', async(req, res) => {
//     const {userId, productId, quantity} = req.params;
//     const basketQuery = 'INSERT INTO Baskets (UserID, ProductID, ItemQuantity) VALUES (?, ?, ?)';
//     const result = await pool.query(basketQuery, ['1', productId, '1']);
//     res.status(200).json(result);
// });
//
// router.delete('/:userId', async(req, res) => {
//     try{
//         const userId = req.params.userId;
//         const itemIndex = req.body.itemIndex;
//         const basketQuery = 'DELETE FROM Baskets WHERE UserID=? AND ItemIndex=?';
//         const result = await pool.query(basketQuery, [userId, itemIndex]);
//         result.affectedRows === 0 ?
//             (await pool.query('SELECT * FROM Users WHERE UserID=?', userId)).length === 0 ?
//                 res.status(404).send('User not found!') :
//                 res.status(404).send('Item not found!') :
//             res.status(200).json(result);
//     } catch (err) {
//         res.status(404).send('Not found!');
//     }
// })
//
// router.delete('/:userId/clear', async(req, res) => {
//     try {
//         const userId = req.params.userId;
//         const basketQuery = 'DELETE FROM Baskets WHERE UserID=?';
//         const result = await pool.query(basketQuery, userId);
//         result.affectedRows === 0 ?
//             (await pool.query('SELECT * FROM Users WHERE UserID=?', userId)).length === 0 ?
//                 res.status(404).send('User not found!') :
//                 res.status(404).send('No items found in basket!') :
//             res.status(200).json(result);
//     } catch (err) {
//         res.status(404).send('Not found!');
//     }
// })

module.exports = router;
