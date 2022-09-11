// Authenticaton and authorizaton controllers

const User = require('../models/User'); // The user model

const login = (req, res) => {
    console.log( `we received ${req.body}`);
}

const register = (req, res) => {
    console.log( `we received ${req.body}`);
}

module.exports = { login, register };