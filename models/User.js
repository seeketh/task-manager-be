// The User model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 40
    },
    email: {
        type: String,
        required: true,
        match: '^\w+@\w+\.\w\w+'
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30
    }
});

module.exports = mongoose.model('User', userSchema);