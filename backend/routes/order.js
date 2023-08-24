const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  try {
    const productsQuery = 'SELECT O.*, U.UserName, U.UserEmail, \
    P.ProductName FROM Orders as O \
    JOIN Users as U ON O.UserID = U.UserID \
    JOIN Products as P ON O.ProductID = P.ProductID;';
    const rows = await pool.query(productsQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/:orderId', async(req, res) => {
  try{
    const orderId = req.params.orderId;
    const orderQuery = 'UPDATE Orders SET WasCancelled=True WHERE WasCancelled=False AND OrderID=?';
    const result = await pool.query(orderQuery, orderId);
    result.affectedRows === 0 ?
    (await pool.query('SELECT * FROM Orders WHERE WasCancelled=False AND OrderID=?', orderId)).length === 0 ?
    res.status(404).send('Item already cancelled!') :
    res.status(404).send('Item not found!') :
    res.status(200).send('Order cancelled!');
  }catch(err){
    res.status(404).send('Not found!');
  }
});

module.exports = router;