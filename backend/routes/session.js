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

    return { accessToken, refreshToken };
}


router.post('/login', async (req, res) => {
    try {
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
        
        const userTokens = await fetchUserTokens(user.UserID);
        
        const token = userTokens.accessToken || jwt.sign(
            user,
            config.secret,
            {
                algorithm: 'HS256',
                expiresIn: config.tokenLife,
            },
        );
        
        const refreshToken = userTokens.refreshToken || jwt.sign(
            user,
            config.refreshTokenSecret,
            {
              algorithm: 'HS256',
              expiresIn: config.refreshTokenLife,
            },
        );

        await insertUserSession(user.UserID, token, refreshToken);

        return res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                expires: config.cookieLife,
                sameSite: 'strict',
            })
            .status(200)
            .json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                refreshToken: refreshToken,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const token = req.cookies.access_token;
        console.log(token); // log the access_token cookie value
        
        await deleteUserSession(token);

        res.clearCookie('access_token', {path: '/'});
        res.status(200).json({message: 'Logout successful!'});
        return res.end();
    } catch (error) {
        res.status(400).json({message: 'Cookie isn\'t cleared'});
    }
});



router.use(require('../helpers/tokenChecker'));

module.exports = router;