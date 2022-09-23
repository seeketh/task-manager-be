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

    // User does not exist
    if (!user) {
        return res.status(status.OK).send({
            success: false,
            msg: "Invalid credentials"
        });
    }

    // Authenticate 
    try {
        const isAuthenicated = await user.authenticate(password);
        // Wrong password
        if (!isAuthenicated) {
            console.log("in auth ", isAuthenicated);
            return res.status(status.NOTAUTHORIZED).send({
                success: false,
                msg: "Invalid credentials"
            });
        }
        //  Else Authorize - going for httpOnly, signed cookie
        // containing jwt. 
        const payload = user.authorize();
        //console.log("here is the payload: ", payload);
      
        res
        .status(status.OK)
        .cookie('pat', payload.token, {
            maxAge: 3600000,
            httpOnly: true,
            signed: true
        })
        .clearCookie('access-token')
        .json({
            sucess: true,
            msg: payload.user
        });
          ////////
    } catch(error) {
        console.log("in auth ", error);
        return res.status(status.SERVERERROR).send({
            success: false,
            msg: "Failed to authenticate, try again later"
        });
    };

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