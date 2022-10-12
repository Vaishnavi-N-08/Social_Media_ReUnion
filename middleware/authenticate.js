const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const authentication = async(req,res,next) =>{
    try{
        const token = req.body.token;
        const username = jwt.verify(token,process.env.TOKEN_SECRET);

        const user = await User.findOne({username:username});

        if(!user){
            throw new Error('User not found');
        }
        req.userId = user._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorised: No token Provided");
        console.log(error)
    }
}

module.exports = authentication;