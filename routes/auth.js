const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

//validacion
const Joi = require('@hapi/joi');
 //validacion de la informacion antes de registro
 
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

const loginValidacion = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return Joi.validate(data, schema);
}


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

            //Registro de nuevo usuario
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
        }

});
//router.post('/login')
//api/usuario/login

module.exports = router;