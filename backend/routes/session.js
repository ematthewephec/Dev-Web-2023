const express = require('express');
const router = express.Router();
const config = require('../config/auth.conf');
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenList = {};

// Insert the refresh token into the database
const insertUserSession = async (userId, accessToken, refreshToken) => {
    await pool.query(
        'INSERT INTO Sessions (UserID, AccessToken, RefreshToken) VALUES (?, ?, ?)',
        [userId, accessToken, refreshToken]
    );
};

// Fetch the refresh token from the database
const fetchUserTokens = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM Sessions WHERE UserID = ?',
        userId
    );

    const { accessToken, refreshToken } = result[0] || {};
    
    const decodedAccessToken = jwt.decode(accessToken) || {};
    const decodedRefreshToken = jwt.decode(refreshToken) || {};

    if (decodedAccessToken.exp < Date.now() / 1000) {
        accessToken = null;
    }

    if (decodedRefreshToken.exp < Date.now() / 1000) {
        refreshToken = null;
    }

    return { accessToken, refreshToken };
};


const deleteUserSession = async (token) => {
    const tokenResult = await pool.query(
        'SELECT * FROM Sessions WHERE AccessToken = ?',
        token
    );

    const { accessToken, refreshToken } = result[0] || {};
    
    const decodedAccessToken = jwt.decode(accessToken) || {};
    const decodedRefreshToken = jwt.decode(refreshToken) || {};

    if (decodedAccessToken.exp < Date.now() / 1000) {
        accessToken = null;
    }

    if (decodedRefreshToken.exp < Date.now() / 1000) {
        refreshToken = null;
    }

    const clearResult = await pool.query(
        'UPDATE Sessions SET AccessToken=?, RefreshToken=? WHERE AccessToken=?',
        [accessToken, refreshToken, token]
    );

    //return { accessToken, refreshToken };
}

router.post('/', async (req, res) => {
    try {
        if(req.session.email != null) return res.status(200).send("Already logged in.")

        const { email, password } = req.body;
        const checkEmailQuery = 'SELECT * FROM Users WHERE DeletionDate IS NULL AND UserEmail=?';
        const emailRows = await pool.query(checkEmailQuery, email);

        if (emailRows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }
        
        const user = emailRows[0];
        const match = await bcrypt.compare(password, user.UserPassword);
        
        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }
        
        req.session.email = user.UserEmail;
        req.session.userId = user.UserID;
        req.session.name = user.UserName;

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

router.delete('/', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.status(200).json({message: 'Logout successful!'});
            return res.end();
        });
    } catch (error) {
        res.status(400).json({message: 'Session isn\'t cleared'});
    }
});

router.get('/protected', (req, res) => {
    const accessToken = req.cookies.access_token;
    // Do something with the access token
    return accessToken;
  });

router.use(require('../helpers/tokenChecker'));

module.exports = router;