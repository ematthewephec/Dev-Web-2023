const express = require('express');
const router = express.Router();
const config = require('../config/auth.conf');
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tokenList = {};

// Insert the refresh token into the database
const insertRefreshToken = async (userId, refreshToken) => {
    await pool.query(
        'INSERT INTO Sessions (UserID, SessionToken) VALUES (?, ?)',
        [userId, refreshToken]
    );
};

// Fetch the refresh token from the database
const fetchRefreshToken = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM Sessions WHERE UserID = ?',
        [userId]
    );

    return result.rows[0].refresh_token;
};

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkEmailQuery = 'SELECT * FROM Users WHERE DeletionDate IS NULL AND UserEmail=?';
        const emailRows = await pool.query(checkEmailQuery, email);

        if (emailRows.length > 0) {
            const user = emailRows[0];
            console.log(user)
            const match = await bcrypt.compare(password, user.UserPassword);
            
            if (match) {
                const token = jwt.sign(
                    user,
                    config.secret,
                    {
                      algorithm: 'HS256',
                      expiresIn: config.tokenLife,
                    },
                );

                // Insert the refresh token into the database
                const refreshToken = jwt.sign(
                    user,
                    config.refreshTokenSecret,
                    {
                      algorithm: 'HS256',
                      expiresIn: config.refreshTokenLife,
                    },
                );
                //await insertRefreshToken(user.UserID, refreshToken);

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
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Incorrect email or password',
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

router.post('/logout', (req, res) => {
    try {
      res.clearCookie('access_token', {path: '/'});
      res.status(200).json({message: 'Logout successful!'});
      return res.end();
    } catch (error) {
      res.status(400).json({message: 'Cookie isn\'t cleared'});
    }
  });

router.use(require('../helpers/tokenChecker'));

module.exports = router;