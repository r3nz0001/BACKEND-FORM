const express = require('express');
const cors = require("cors")
require('dotenv').config();
const {dbConnection} = require('./database/config')




//const port = process.env.PORT || 4000;

//console.log(process.env)
// crear el servidor de express

const app = express();

const whitelist = ["http://localhost:3000"];

app.use(cors())
  

// Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public')); 

// Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth.js'))

// TODO CRUD: Eventos

// escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})