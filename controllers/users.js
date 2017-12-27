const JWT = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/config');

//this method generate token
signToken = (user) => {
    return JWT.sign({
        iss: 'CRUX',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    SignUp: async(req, res) => {
        const { email, password, firstName, lastName, phnNumber } = req.value.body;
        const foundUser = await User.findOne({ "local.email": email })
        if (foundUser) {
            return res.status(409).json({ error: "Email is already in user" })
        }
        const salt = await bcrypt.genSalt(10)
        const passHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            method: 'local',
            local: {
                email,
                password: passHash
            },
            firstName,
            lastName,
            phnNumber
        })

        const user = await newUser.save();
        const token = signToken(newUser);
        res.status(200).json({ token })

    },
    SignIn: async(req, res) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    googleOAuth: async(req, res) => {
        //Generate Token 
        // console.log('got here');
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    User: async(req, res) => {
        const user = await User.findById(req.user._id)
        console.log(user)
        res.status(200).json(user);
    }
}