// Importando Express en nuestro proyecto
const express = require('express')
const cors = require('cors')
const path = require('path')

// Creando nuestra aplicación; instancia de Express
const app = express()
const puerto = 3000;

// Convertir los datos a formato JSON
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Usar EJS como motor de vistas
app.set('view engine', 'ejs')

// Archivos estáticos
app.use(express.static(__dirname + '/public'))

// Módulos de la aplicación
const rutaLogin = require('./app/index.js')
const rutaSignup = require('./app/register.js')
const rutaBooks = require('./models/books.js')

app.use('/', rutaLogin)
app.use('/books', rutaBooks)
app.use('/register', rutaSignup)

// Escucha de la aplicación
app.listen(puerto, () => {
    console.log(`Aplicación corriendo en el puerto ${puerto}`)
})