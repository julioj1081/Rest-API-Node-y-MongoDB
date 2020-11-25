const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
//validacion
const Joi = require('@hapi/joi');
 //validacion de la informacion antes de registro
 
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

const schemaLogin = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
}); 


router.post('/registro', async (req, res)=>{

    //res.send('Registro') comentar lo de abajo;
    const validation = schema.validate(req.body);
    const { error } = validation;
    if(error){
            res.status(400).json({
                message: 'Error no cumple con las especificaciones del modelo.',
                details: error.details[0].message
            });
        }else{
            //Email de usuario existente
            const emailExistente = await Usuario.findOne({
                email: req.body.email
            });
            if(emailExistente)return res.status(400).send('Email existente prueba otro');

            //Hash password bycryptjs
            
            const salt = await bcrypt.genSalt(10);
            const hashhedPassword = await bcrypt.hash(req.body.password, salt);
            //Registro de nuevo usuario
            const user = new Usuario({
                name: req.body.name,
                email: req.body.email,
                password: hashhedPassword
            });

            try{
                const save = await user.save();
                //res.send(save);
                res.send({user: user._id})
            }catch(err){
                res.status(400).send(err);
            }     
        }

});
//Login
router.post('/login', async (req, res) => {
     const validation = schemaLogin.validate(req.body);
    const { error } = validation;
    if(error){
            res.status(400).json({
                message: 'Error no cumple con las especificaciones del modelo.',
                details: error.details[0].message
            });
        }else{ 
        //Email de usuario existente
        const usuarioExistente = await Usuario.findOne({
            email: req.body.email
        });
        if(!usuarioExistente)return res.status(400).send('Email no fue encontrado');
        //password correcto compara
        const validPass = await bcrypt.compare(req.body.password, usuarioExistente.password);
        if(!validPass) return res.status(400).send('Invalido password');
            res.send('Logeado es correcto');
        
        }
     
});
//api/usuario/login

module.exports = router;