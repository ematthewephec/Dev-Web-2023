const express = require('express');
const router = express.Router();
//const pool = require('../helpers/database');

router.get('/', (req, res) => {
    res.status(200).send("This is the product route of the API!");
})

module.exports = router;