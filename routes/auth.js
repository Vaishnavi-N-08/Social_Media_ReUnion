const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
//Register

// get config vars
dotenv.config();
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}


router.post("/register", async (req, res) => {
    try {
        //generate hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create new user

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        //save user

        const user = await newUser.save();
        const token = generateAccessToken(user.username);
        res.status(200).json(token);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post("", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            res.status(403).send("user not found");
        } 
        else{
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword)
            {
                res.status(403).send("wrong password")
            }
            else{
                const token = generateAccessToken(user.username);
                res.status(200).json(token);
            }
            
        }
    } catch (err) {
        res.status(500).json(err)
    }

});


module.exports = router