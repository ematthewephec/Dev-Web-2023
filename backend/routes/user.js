const express = require('express');
const router = express.Router();
//const config = require('../config/auth.conf')
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getCurrentDate = require('../helpers/utils');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    res.status(200).send("This is the user route of the API!");
});

router.get('/:id', async(req, res) => {
    try {
        const userQuery = 'SELECT * FROM Users WHERE DeletionDate IS NULL AND UserID=?';
        const rows = await pool.query(userQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
      const {credentials, addressInfo} = req.body;
      const {username, email, password} = credentials
      const checkEmailQuery = 'SELECT UserEmail FROM Users WHERE DeletionDate IS NULL AND UserEmail=?';
      const emailRows = await pool.query(checkEmailQuery, email);

      if (emailRows.length > 0) {
        res.status(409).json({message: 'Email already registered'});
      } else {
        const creationDate = getCurrentDate();
        const encryptedPass = await bcrypt.hash(password, saltRounds);
        const registerQuery = 'INSERT INTO Users(UserName, UserEmail, UserPassword, CreationDate) VALUES (?,?,?,?)';
        const userResult = await pool.query(registerQuery, [username, email, encryptedPass, creationDate]);

        const userId = userResult.insertId;
        const {street, postalCode, country} = addressInfo;
        const addressQuery = 'INSERT INTO Addresses(UserID, Street, Postcode, Country) VALUES (?,?,?,?)';
        const addressResult = await pool.query(addressQuery, [userId, street, postalCode, country]);

        res.status(200).json({message: `User ${userId} registered!`});
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
});

router.patch('/:id/delete', async (req, res) => {
    try {
        const userId = req.params.id;
        const checkUserQuery = 'SELECT * FROM Users WHERE DeletionDate IS NOT NULL AND UserID=?';
        const userRows = await pool.query(checkUserQuery, userId);

        if (userRows.length === 0) {
            res.status(404).json({message: 'User not found.'});
        } else {
            const deletionDate = getCurrentDate();
            const patchUserQuery = 'UPDATE Users SET DeletionDate=? WHERE UserID=?';
            const result = await pool.query(patchUserQuery, [deletionDate, userId]);
            res.status(200).json({message: 'User successfully deleted.'});
        }
    } catch (error) {
      res.status(404).send(error.message);
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation des données (vous pouvez utiliser express-validator ici)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const checkEmailQuery = 'SELECT UserID, UserEmail, UserPassword, UserName, UserFirstname FROM Users WHERE DeletionDate IS NULL AND UserEmail=?';
        const emailRows = await pool.query(checkEmailQuery, [email]);

        if (emailRows.length === 0) {
            return res.status(401).json({ message: 'Email not found' });
        }

        const user = emailRows[0];
        const match = await bcrypt.compare(password, user.UserPassword);

        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Créer un jeton d'authentification JWT
        const payload = { userId: user.UserID };
        const secretKey = 'your-secret-key'; // Remplacez par votre clé secrète
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secretKey, options);

        return res.status(200).json({ token, userId: user.UserID, firstName: user.UserFirstname, lastName: user.UserName });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
