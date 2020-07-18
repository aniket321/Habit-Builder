const express = require('express');
const router = express.Router();

//Users model
const Post = require('../../models/Posts');
const User = require('../../models/Users');

//routes

//@ GET      /api/posts
//@ DESC:-   will get list of all the posts
//@ Access:- public
router.get('/:sortType', async (req, res) => {
    try {
        const postLimit = req.body.postLimit;
        const start = req.body.start;
        let sortType;
        switch (req.params.sortType) {
            case 'asc':
                sortType = -1;
                break;
            case 'desc':
                sortType = 1;
                break;
            default:
                sortType = -1;
                break;
        }

        const posts = await Post.find().skip(start).limit(postLimit).sort({ timestamp: sortType });
        //let postList = posts.sort((a, b) => b.timestamp - a.timestamp);
        res.send(posts);
    } catch (e) {
        res.status(500).send(e)
    }

})


//@ POST     /api/posts
//@ DESC:-   will add a new post
//@ Access:- private
router.post('/', async (req, res) => {
    try {
        const posts = new Post(req.body);
        await posts.save();
        // const post = Post.find().limit(1).sort({ timestamp: -1 });
        // const postId = post._id;
        // const userId = posts.author;
        // const user = await User.findById(userId);
        // user.posts.push(postId);
        // await user.save();
        res.status(201).send({ posts, message: "Post added successfully!" })

    } catch (e) {
        res.status(400).send({ e, message: "Some error occured, please try again" })
    }
})


//@ POST     /api/posts/like
//@ DESC:-   will like a post
//@ Access:- private
router.post('/like', async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId;
        const posts = await Post.findById(postId);
        let likeAlreadyExists = false;

        for (let i = 0; i < posts.likes.length; i++) {
            if (posts.likes[i] === userId) {
                likeAlreadyExists = true;
                break;
            }
        }

        // posts.likes += 1;
        if (likeAlreadyExists === true) {
            throw new Error('Already liked');
        }
        posts.likes.push(userId);
        await posts.save();
        res.send(posts);
    } catch (e) {
        res.status(500).send({ e, message: `${e}` });
    }
})


module.exports = router;