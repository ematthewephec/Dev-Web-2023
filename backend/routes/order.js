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
module.exports = router;