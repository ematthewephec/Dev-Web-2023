const jwt = require('jsonwebtoken');
const config = require('../config/auth.conf');

module.exports = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if(!token){
        return res.status(403).send({
            error: true,
            message: 'No token provided.'
        });
    }

    try {
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) {
                res.status(401).json({
                    error: true,
                    message: 'Unauthorized access'
                });
            }
            req.decoded = decoded;
            req.id = data.id;
            return next();
        })
    } catch {
        return res.sendStatus(403);
    }
}