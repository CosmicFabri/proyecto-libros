const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// La colección de usuarios registrados en la BD
const users = require('../models/users')

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
        const books = await Book.find(); // Obtener todos los libros
        res.render('books', { books }); // Renderizar la vista con la lista de libros
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).send('Ocurrió un error al cargar los libros.');
    }
})

// Comprar un libro
router.post('/buy', async (req, res) => {
    try {
        const { bookId } = req.body; // ID del libro desde el cliente
        const userId = req.session.userId; // ID del usuario logueado (usando sesión)

        // Verificar si el usuario está logueado
        if (!userId) {
            return res.status(401).send('Debes iniciar sesión para comprar un libro.');
        }

        // Buscar el usuario y el libro
        const user = await users.findById(userId);
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).send('El libro no existe.');
        }

        // Verificar saldo del usuario
        if (user.balance < book.price) {
            return res.status(400).send('No tienes suficiente saldo para comprar este libro.');
        }

        // Restar el precio del libro del saldo del usuario
        user.balance -= book.price;
        await user.save();

        // Eliminar el libro de la base de datos
        await Book.findByIdAndDelete(bookId);

        res.send(`Has comprado el libro: "${book.title}" exitosamente.`);
    } catch (error) {
        console.error('Error al comprar el libro:', error);
        res.status(500).send('Ocurrió un error al procesar tu compra.');
    }
})

// Exportando el enrutador para poder usarlo en main.js
module.exports = router