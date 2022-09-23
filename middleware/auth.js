const jwt = require('jsonwebtoken');
const status = require('../config/status');
const { createAuthRes } = require('../utils/authUtils');
require('dotenv').config();

// Authorization middleware
const authorizationMidleware = (req, res, next) => {

    // get the signed authorization token (should've been unsigned by cookie-parser Middleware)
    const authToken = req.signedCookies.pat;

    // console.log('headers', req.headers);
    // console.log('signedCookie', req.signedCookies.pat);
    // console.log('token', authToken);

    if (!authToken) {
        return res.status(status.NOTAUTHORIZED).send(createAuthRes(false, "Not authorized"));
    }

    // attempt to decode the token
    try {
        // decode and extract user ID & 
        const { userId } = jwt.verify(authToken, process.env.KEY);
        // attach user iD to the request for this middleware is used on.
        req.userId = userId;
        next();
    } catch(error) {
        // invalid proposed token
        // console.log(error);
        return res.status(status.NOTAUTHORIZED).send(createAuthRes(false, "Not authorized"));
    }
}

module.exports = { authorizationMidleware };