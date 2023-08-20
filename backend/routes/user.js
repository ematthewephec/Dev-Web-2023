const express = require('express');
const router = express.Router();
//const config = require('../config/auth.conf')
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getCurrentDate = require('../helpers/utils');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importez le module cors

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})); // Utilisez le middleware cors

router.get('/', async (req, res) => {
    res.status(200).send("This is the user route of the API!");
});

router.get('/:id', async(req, res) => {
    try {
        const userQuery = 'SELECT * FROM Users WHERE DeletionDate IS NULL AND UserID=?';
        const addressQuery = 'SELECT * FROM Addresses WHERE UserID=?';

        const userRows = await pool.query(userQuery, req.params.id);
        const addressRows = await pool.query(addressQuery, req.params.id);

        const user = userRows[0];
        const addresses = addressRows;

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        const userDataWithAddresses = {
            user,
            addresses
        };

        res.status(200).json(userDataWithAddresses);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données' });
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
    const checkEmailQuery = 'SELECT UserEmail FROM Users WHERE DeletionDate IS NULL AND UserEmail=?';
    const emailRows = await pool.query(checkEmailQuery, email);

});

router.post('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body; // Supposons que les données à mettre à jour sont envoyées dans le corps de la requête

        // Vérifier si l'e-mail existe déjà
        const checkEmailQuery = 'SELECT * FROM Users WHERE UserEmail=? AND UserID <> ?';
        const emailRows = await pool.query(checkEmailQuery, [updateData.email, userId]);

        if (emailRows.length > 0) {
            res.status(400).json({ message: 'Cette adresse e-mail est déjà utilisée par un autre utilisateur.' });
            return;
        }

        const checkUserQuery = 'SELECT * FROM Users WHERE UserID=?';
        const userRows = await pool.query(checkUserQuery, userId);

        if (userRows.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return;
        }

        const updateUserQuery = 'UPDATE Users SET UserName=?, UserFirstname=?, UserEmail=? WHERE UserID=?';
        const result = await pool.query(updateUserQuery, [updateData.userName, updateData.firstName, updateData.email, userId]);

        res.status(200).json({ message: 'Informations utilisateur mises à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des informations.' });
    }
});

module.exports = router;
