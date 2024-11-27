const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

/* CONFIGURACIÓN DE MONGOOSE */

// URI de la base de datos MongoDB
const mongoDBURI = "mongodb://127.0.0.1:27017/bookstore"

// Check connection to the database
mongoose.connect(mongoDBURI)    
    .then(() => { console.log("Conexión exitosa con la BD (users)!") })
    .catch((err) => { console.log("Se recibió un error...") })

/* MODELOS DE MONGOOSE */

// Definición del esquema de Mongoose para la colección 'users'
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Obteniendo la colección de usuarios
const collection = new mongoose.model('users', loginSchema)

module.exports = collection