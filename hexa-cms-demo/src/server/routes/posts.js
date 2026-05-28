const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();

        const io = req.app.get('io');
        io.emit('new_post_alert', {
            title: newPost.title,
            author: newPost.author
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
