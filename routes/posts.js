const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); //modelo

router.get('/', (req, res) => {
    res.send('hello posts');
});

//
router.post('/', (req, res)=> {
    console.log(req.body);
})

//exportar
module.exports = router;