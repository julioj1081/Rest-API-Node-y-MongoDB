const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); //modelo

router.get('/', (req, res) => {
    res.send('hello posts');
});

//
router.post('/', async(req, res)=> {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});

//exportar
module.exports = router;