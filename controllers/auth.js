const status = require("../config/status");
const User = require('../models/User'); // The user model

// Authenticaton and authorizaton controllers

const login = async (req, res) => {
   const { email, password } = req.body;

    if (!email || !password) {
        return res.status(status.BADREQUEST).send({
            success: false,
            msg: "Please provide username and paswword"
        });
    }

    // find the user
    const user = await User.findOne({email});

    // Email does not exist
    if (!user) {
        return res.status(status.OK).send({
            success: false,
            msg: "Invalid credentials"
        });
    }

    // Authenticate
    user.authenticate(password, user.password)
    .then(isAuthenicated => {
        // Wrong password
        if (!isAuthenicated) {
            console.log("in auth ", isAuthenicated);
            return res.status(status.NOTAUTHORIZED).send({
                success: false,
                msg: "Invalid credentials"
            });
        }
        //  Else Authorize
        const payload = user.authorize();
        res.status(status.OK).send(payload);
    })
    .catch(error => {
        console.log("in auth ", error);
        return res.status(status.SERVERERROR).send({
            success: false,
            msg: "Failed to authenticate, try again later"
        });
    });

}

const register = async (req, res) => {
    // Create User
    const user =  await User.create(req.body);

    // Authorize user
    const payload = user.authorize();

    // Send back Auth token
    res.status(status.CREATED).send(payload);
}

module.exports = { login, register };