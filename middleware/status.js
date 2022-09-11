require('dotenv').config(); // Use the .env file

// 
const OK = parseInt(process.env.OK);
const CREATED = parseInt(process.env.CREATED);
const BADREQUEST = parseInt(process.env.BADREQUEST);
const NOTAUTHORIZED = parseInt(process.env.NOTAUTHORIZED);
const NOTFOUND = parseInt(process.env.NOTFOUND);
const SERVERERROR = parseInt(process.env.SERVERERROR);

module.exports = {
    OK,
    CREATED,
    BADREQUEST,
    NOTAUTHORIZED,
    NOTFOUND,
    SERVERERROR
}