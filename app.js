/**
 * The Task Manager API
 * Actions:
 * Task - Task CRUD
 * Auth - Register/Login
 * 
 */

const express = require('express');
const app = express(); // The app.
require('dotenv').config(); // use .env file
const connectDb = require('./database/connection'); // MongoDb connection function.
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task'); 
const { authorizationMidleware } = require('./middleware/auth');
const cors = require('cors');

const requestLogger = require('./middleware/logger'); // Loger Middleware
const port = process.env.PORT || 4001;

app.use(cookieParser(process.env.COOKIEKEY)); // Cookies will be signed
app.use(requestLogger); // log request url For dev troubleshooting
app.use(express.json()); // Attemp to parse json in the req body

// CORS options
const corsOptions = {
    origin: process.env.ALLOW_ORIGIN,
    credentials: true
}

// routes
app.use('/api/v1/auth', cors(corsOptions), authRouter); // Authenticaton routes
app.use('/api/v1/task', cors(corsOptions), authorizationMidleware, taskRouter); // Task routes

// Creating Db connection and start server
const appStart = async () => {
    try {
        await connectDb(process.env.MONGODB_URI);
        app.listen(port, console.log(`Server running on port ${port}`));
    } catch(error) {
        console.log(error);
    }
}

// Start the server.
appStart();