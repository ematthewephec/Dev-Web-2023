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

const { validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const userQuery = 'SELECT * FROM Users WHERE DeletionDate IS NULL;';
    const rows = await pool.query(userQuery);
    res.status(200).json(rows);
} catch (error) {
    res.status(404).send(error.message);
}
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
      const {username, email, password, firstname} = credentials
      const checkEmailQuery = 'SELECT UserEmail FROM Users WHERE DeletionDate IS NULL AND UserEmail=?';
      const emailRows = await pool.query(checkEmailQuery, email);

      if (emailRows.length > 0) {
        res.status(409).json({message: 'Email already registered'});
      } else {
        const creationDate = getCurrentDate();
        const encryptedPass = await bcrypt.hash(password, saltRounds);
        const registerQuery = 'INSERT INTO Users(UserName, UserEmail, UserPassword, CreationDate, UserFirstname) VALUES (?,?,?,?,?)';
        const userResult = await pool.query(registerQuery, [username, email, encryptedPass, creationDate, firstname]);

        const userId = userResult.insertId;
        const {street, postalCode, country, city} = addressInfo;
        const addressQuery = 'INSERT INTO Addresses(UserID, Street, Postcode, Country, City) VALUES (?,?,?,?, ?)';
        const addressResult = await pool.query(addressQuery, [userId, street, postalCode, country, city]);

        res.status(200).json({message: `User ${userId} registered!`});
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const userId = req.body.id;

        const checkUserQuery = 'SELECT * FROM Users WHERE DeletionDate IS NULL AND UserID=?';
        const userRows = await pool.query(checkUserQuery, userId);

        if (userRows.length === 0) {
            res.status(404).json({message: 'User not found.'});
        } else {
            const deletionDate = getCurrentDate();
            const patchUserQuery = 'UPDATE Users SET DeletionDate=?, UserName="user deleted", UserEmail="user deleted", UserFirstName="user deleted" WHERE UserID=?';
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

        const updateUserAddressQuery = 'UPDATE Addresses SET Street=?, Postcode=?, Country=?, City=? WHERE UserID=?';
        const result2 = await pool.query(updateUserAddressQuery, [updateData.street, updateData.zip, updateData.country, updateData.city, userId]);

        res.status(200).json({ message: 'Informations utilisateur mises à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des informations.' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const updateData = req.body;
        const userId = updateData.id;
        const password = updateData.password


        const encryptedPass = await bcrypt.hash(password, saltRounds);

        const checkUserQuery = 'SELECT * FROM Users WHERE UserID=? AND DeletionDate is NULL ';
        const userRows = await pool.query(checkUserQuery, userId);

        if (userRows.length === 0) {
            res.status(404).json({ message: 'Erreur lors de la mise à jour' });
            return;
        }

        const updateUserQuery = 'UPDATE Users SET UserPassword=? WHERE UserID=?';
        const result = await pool.query(updateUserQuery, [encryptedPass, userId]);

        res.status(200).json({ message: 'Mot de passe mise à jour avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour.' });
    }
});

module.exports = router;
