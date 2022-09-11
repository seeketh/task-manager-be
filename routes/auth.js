// The Authenticaton and Authorization routes

const express = require('express');
const authRouter = express.Router();

const { login, register } = require('../controllers/auth'); // Auth controllers

authRouter.route('/login').post(login);
authRouter.route('/register').post(register);


module.exports = authRouter;