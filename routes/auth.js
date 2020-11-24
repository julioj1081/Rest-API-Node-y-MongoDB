const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
router.post('/registro', async (req, res)=>{
    //res.send('Registro');
    const user = new Usuario({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const save = await user.save();
        res.send(save);
    }catch(err){
        res.status(400).send(err);
    }
});
//router.post('/login')
//api/usuario/login

module.exports = router;