const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const Post = require('../models/Post');

//index
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({
            message: error.message
        });
    }
});

//show
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

//store
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const result = await post.save();
        res.json(result);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

//update
router.patch('/:id', async (req, res) => {
    var attributes = {};

    if (req.body.title) attributes.title = req.body.title;
    if (req.body.description) attributes.description = req.body.description;
    
    try {
        const newPost = await Post.updateOne(
            { _id: req.params.id },
            { $set: attributes }
        );
        res.json(newPost);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

//destroy
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.remove({ _id: req.params.id });
        res.json(post);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

module.exports = router;
