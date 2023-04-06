const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require('dotenv').config();

// The User model
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
        unique: true,
        //match: ['/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)\*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((la-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/</>", "Please provide a valid email']
        //match: ["/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/", 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    // TODO: Create custom Errors and handle this case with a suitable
    // Generate a hash salt.
    const salt = await bcrypt.genSalt(11);
    // Hash password prior to saving it.
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.method('authenticate', async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
});

userSchema.method('authorize', function() {
    const token = jwt.sign(
        {
            userId: this._id,
            userEmail: this.email
        },
        process.env.KEY,
        {
            expiresIn: process.env.VALIDITY
        }
    );
    return ({
        user: { name: this.name },
        token
    });
})

module.exports = mongoose.model('User', userSchema);