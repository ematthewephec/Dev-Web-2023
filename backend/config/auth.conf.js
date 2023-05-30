require('dotenv').config({path: '.env'});
module.exports = {
    name: 'session',
    key: 'userId',
    secret: process.env.SECRETSESSION,
    refreshTokenSecret: process.env.REFRESHTOKEN,
    resave: false,
    saveUninitialized: false,
    tokenLife: 3600,
    refreshTokenLife: 86400,
    expires: new Date(Date.now() + 24*60*60*1000), // 24h
    cookieLife: new Date(Date.now() + 30*60*1000) // 30 mins
}