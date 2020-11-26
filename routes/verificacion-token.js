const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Acceso denegado');
    try{
        const verificacion = jwt.verify(token, process.env.TOKEN_SECRETO);
        req.user = verificacion;
        next();
    }catch(Err){
        res.status(400).send('Token invalido');
    }
}
