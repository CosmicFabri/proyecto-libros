const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

/* CONFIGURACIÓN DE MONGOOSE */

// URI de la base de datos MongoDB
const mongoDBURI = "mongodb://127.0.0.1:27017/bookstore"

// Conexión con la base de datos MongoDB
mongoose.connect(mongoDBURI)    
    .then(() => { console.log("Conexión exitosa con la BD!") })
    .catch((err) => { console.log("Se recibió un error...") })

/* MODELO DE MONGOOSE */

// Definición del esquema de Mongoose para la colección 'books'
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    genres: Array,
    rating: Number,
    coverURL: String,
    price: Number
})

// Modelo basado en el esquema
const Book = mongoose.model('Book', bookSchema)

// Endpoint para obtener todos los documentos de la colección 'books'
router.get('/', async (req, res) => {
    try {
        // Recuperar todos los documentos de la colección 'books'
        const books = await Book.find();
        // Enviar la respuesta en formato JSON
        res.json(books);
    } catch (err) {
        res.status(500).send('Error al obtener los libros');
    }
})

// Exportando el enrutador para poder usarlo en main.js
module.exports = router