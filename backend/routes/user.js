const express = require('express');
const router = express.Router();
//const config = require('../config/auth.conf')
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
//const bodyParser = require('body-parser');
const saltRounds = 10;
//const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    res.status(200).send("This is the user route of the API!");
});

router.get('/:id', async(req, res) => {
    try {
        const userQuery = 'SELECT * FROM Users WHERE UserID=? AND DeletionDate IS NULL;';
        const rows = await pool.query(userQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
      const {username, email, password} = req.body;
      const checkEmailQuery = 'SELECT UserEmail FROM Users WHERE UserEmail=? AND DeletionDate IS NULL;';
      const emailRows = await pool.query(checkEmailQuery, email);
  
      if (emailRows.length > 0) {
        res.status(409).json({message: 'Email already registered'});
      } else {
        const currentDate = () => new Date().toLocaleDateString();
        const encryptedPass = await bcrypt.hash(password, saltRounds);
        const registerQuery = 'INSERT INTO Users(UserName, UserEmail, UserPassword, CreationDate) VALUES (?,?,?,?)';
        const result = await pool.query(registerQuery, [username, email, encryptedPass, currentDate]);
        res.status(200).json({message: 'User registered!'});
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;