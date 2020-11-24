const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); //sirve para hacer peticiones fetch
//importacion auth
const authRoute = require('./routes/auth');
require('dotenv/config'); //conexion a la base mongo atlas



//para tener acceso a peticiones
app.use(cors());
app.use(bodyParser.json());

//import router
const postsRoute = require('./routes/posts');
const router = require('./routes/auth');
app.use('/posts', postsRoute);

//rutas
app.get('/', (req, res) => {
    res.send('hola api rest y mongodb');
});

//Middleware
app.use(express.json());
app.use('/api/usuario', authRoute); //para la autenticacion


//mongodb+srv:julioj1081:<password>@cluster0.gbuax.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology: true, useNewUrlParser: true}, () => 
    console.log('Conexion a la base de datos! https://cloud.mongodb.com/v2/5fbc6bd3b1c5c903d6a63d5c#clusters')
);
app.listen(3000);
