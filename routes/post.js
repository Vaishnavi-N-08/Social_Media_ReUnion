const router = require("express").Router();
const bluebird = require("bluebird");
const Post = require("../models/Post");
const Comments = require("../models/Comments");
const authentication = require("../middleware/authenticate");

//create post

router.post("/posts/", authentication, async (req, res) => {
    const newPost = new Post({
        userId: req.userId,
        title: req.body.title,
        desc: req.body.desc
    });
    try {
        const savedPost = await newPost.save();
        const post_data = {
            id: savedPost._id,
            title: savedPost.title,
            desc: savedPost.desc,
            createdAt: savedPost.createdAt
        }
        res.status(200).json(post_data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//delete the post

router.delete("/posts/:id", authentication, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId = req.params.id) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted successfully");
        }
        else {
            res.status(403).json("You can delete only your post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Like the post
router.post("/like/:id", authentication, async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        if (!post.likes.includes(req.userId)) {
            await post.updateOne({ $push: { likes: req.userId } });
            res.status(200).send("The post has been liked");
        }
        else {
            res.status(403).send("You have already liked the post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

});

//Unlike the post
router.post("/unlike/:id", authentication, async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        if (post.likes.includes(req.userId)) {
            await post.updateOne({ $pull: { likes: req.userId } });
            res.status(200).send("The post has been unliked");
        }
        else {
            res.status(403).send("you have already unliked the post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

});

//comment on post
router.post('/comment/:id', authentication, async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        if (post) {
            const newcomment = new Comments({
                userId: req.userId,
                comment_text: req.body.comment_text
            });
            const comment = await newcomment.save();

            await post.updateOne({$push:{ comments: comment }});
            res.status(200).json(comment._id);
        }
        else {
            res.status(403).send("Post not found");
        }
    } catch (err) {
    res.status(500).json(err);
}

});

//Get the post with comments and likes

router.get("/posts/:id", authentication, async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id});
        const postData ={
            id: post._id,
            title: post.title,
            desc: post.desc,
            no_likes: post.likes.length,
            no_comments: post.comments.length
        }
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// return all posts of a perticular user

// GET ALL POST
// GET ALL POST
router.get("/all_posts", authentication, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.userId }).sort({ createdAt: "descending" });

        const posts_array = posts.map((post) => {
            return {
                id: post._id,
                title: post.title,
                desc: post.desc,
                createdAt: post.createdAt,
                likes: post.likes.length,
                comments: post.comments.map((comment) => {
                    return{
                        userId: comment.userId, 
                        comment_text: comment.comment_text,
                    };
                }),
            }
        });

        res.status(200).json(posts_array);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;