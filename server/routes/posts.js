const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
    console.log("before post: ");
    console.log(req.body);

    const newPost = new Post(req.body);
    try {
        console.log("Post is: ");
        console.log(newPost);

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  LIKE POST
router.post("/like", async (req, res) => {
    const userID = req.body.userID;
    const postID = req.body.postID;
    console.log("userID: "+ userID);
    console.log("postID: "+ postID);

    try {
        const user = await User.findOne({ _id: userID })

        if (user.Disliked.includes(postID)) 
        {
            user.Disliked.splice(user.Disliked.indexOf(postID), 1)
        }

        if(user.Liked.includes(postID) == false){
            user.Liked.push(postID)
        }
        user.save()

        console.log("Updated User: ")
        console.log(user);

        res.status(200).json(user);
    } catch (err) {
        console.log("error at server is: ");
        console.log(err);
        res.status(500).json(err);
    }
});

//  DISLIKE POST
router.post("/dislike", async (req, res) => {
    const userID = req.body.userID;
    const postID = req.body.postID;
    console.log("userID: "+ userID);
    console.log("postID: "+ postID);

    try {
        const user = await User.findOne({ _id: userID })

        if (user.Liked.includes(postID)) 
        {
            user.Liked.splice(user.Liked.indexOf(postID), 1)
        }

        if(user.Disliked.includes(postID) == false){
            user.Disliked.push(postID)
        }
        user.save()

        console.log("Updated User: ")
        console.log(user);

        res.status(200).json(user);
    } catch (err) {
        console.log("error at server is: ");
        console.log(err);
        res.status(500).json(err);
    }
});

//  ADD COMMENT
router.post("/addComment", async (req, res) => {
    const userID = req.body.userID;
    const postID = req.body.postID;
    console.log("my userID: "+ userID);
    console.log("my postID: "+ postID);

    try {
        const post = await Post.findOne({ _id: postID })

        const comm= {
            commentValue: req.body.commentValue,
            userID: req.body.userID
        };
        post.comment.push(comm);
        post.save();

        res.status(200).json(post);
    } catch (err) {
        console.log("error at server is: ");
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
