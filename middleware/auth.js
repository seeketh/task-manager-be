const jwt = require('jsonwebtoken');
const status = require('../config/status');
const { createAuthRes } = require('../utils/authUtils');
require('dotenv').config();

// Authorization middleware
const authorizationMidleware = (req, res, next) => {
    // get the Auhtorization header
    const authHeader = req.headers.authorization;

    console.log('headers', req.headers);
    console.log('signedCookie', req.signedCookies.pat);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(status.NOTAUTHORIZED).send(createAuthRes(false, "Not authorized"));
    }

    

    // Get the token
    const proposedToken = authHeader.split(' ')[1]; //[0] being 'Bearer'

    // attempt to decode the token
    try {
        // decode and extract user ID & 
        const { userId } = jwt.verify(proposedToken, process.env.KEY);
        // attach user iD to the request for this middleware is used on.
        req.userId = userId;
        next();
    } catch(error) {
        // invalid proposed token
        return res.status(status.NOTAUTHORIZED).send(createAuthRes(false, "Not authorized"));
    }
}

module.exports = { authorizationMidleware };