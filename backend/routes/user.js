const express = require('express');
const router = express.Router();
//const config = require('../config/auth.conf')
const pool = require('../helpers/database');
//const bcrypt = require('bcrypt');
//const bodyParser = require('body-parser');
//const saltRounds = 10;
//const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    res.status(200).send("This is the user route of the API!");
})

module.exports = router;