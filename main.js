// Importando Express en nuestro proyecto
const express = require('express')

// Creando nuestra aplicación; instancia de Express
const app = express()
const puerto = 3000;

// Módulos de la aplicación
const rutaAPI = require('./app/index.js')
const rutaBooks = require('./app/books.js')

app.use('/', rutaAPI)
app.use('/books', rutaBooks)

// Escucha de la aplicación
app.listen(puerto, () => {
    console.log(`Aplicación corriendo en el puerto ${puerto}`)
})