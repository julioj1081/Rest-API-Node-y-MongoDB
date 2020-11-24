const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); //modelo
//Devuelve todos los posts
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

//registra todos los post 
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

//busca un especifico post
router.get('/:postId', async (req, res) => {
    //console.log(req.params.postId)
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

//Actualizar un registro
router.patch('/:postId',async (req, res)=>{
    try{
    const postmodificado= await Post.updateOne(
        {_id: req.params.postId}, {
        $set : {title: req.body.title},
        $set : {description: req.body.description}
    });
    res.json(postmodificado);
    }catch(err){
        res.json({message: err});
    }
})


//Borrar un post
router.delete('/:postId', async (req, res)=> {
    try{
    const postremove = await Post.remove({_id: req.params.postId});
    res.json(postremove);
    }catch(err){
        res.json({message:err});
    }
});

//exportar
module.exports = router;