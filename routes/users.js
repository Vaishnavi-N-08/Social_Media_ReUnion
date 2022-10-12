const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authentication = require('../middleware/authenticate');
//Follow a user
router.post("/follow/:id", authentication,async (req, res) => {
    if (req.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.userId);
            if (!user.followers.includes(req.userId)) {
                await user.updateOne({ $push: { followers: req.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).send("you already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});

//Unfollow a user

router.post("/unfollow/:id", authentication,async (req, res) => {
    if (req.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.userId);
            if (user.followers.includes(req.userId)) {
                await user.updateOne({ $pull: { followers: req.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});

//Return user Profile

router.get("/user", authentication ,async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        const user_profile = {
            username: user.username,
            no_followers: user.followers.length,
            no_following: user.followings.length,
        }
        res.status(200).json(user_profile);
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router