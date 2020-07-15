const express = require('express');
const router = express.Router();

//Users model
const Post = require('../../models/Posts');

//routes

//@ GET      /api/posts
//@ DESC:-   will get list of all the posts
//@ Access:- public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        let postsObj = {};
        for (const index in posts) {
            let postId = posts[index]._id;
            postsObj[postId] = posts[index];
        }
        res.send(postsObj);
    } catch (e) {
        res.status(500).send(e)
    }

})


//@ POST     /api/posts
//@ DESC:-   will add a new post
//@ Access:- private
router.post('/', async (req, res) => {
    const posts = new Post(req.body)
    try {
        await posts.save()
        res.status(201).send({ posts, message: "Post added successfully!" })

    } catch (e) {
        res.status(400).send({ e, message: "Some error occured, please try again" })
    }
})


//@ POST     /api/posts/like
//@ DESC:-   will add a new post
//@ Access:- private
router.post('/like', async (req, res) => {
    try {
        const postId = req.body.id;
        const posts = await Post.findById(postId);
        posts.likes += 1;
        await posts.save();
        res.send(posts);
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


module.exports = router;