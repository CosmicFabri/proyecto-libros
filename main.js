// Importando módulos en nuestro proyecto
const express = require('express')
const cors = require('cors')
const path = require('path')
const session = require('express-session')

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

// Configuración de CORS
// app.use(cors({
//     origin: 'http://localhost:5173'
// }))

// Sesión del usuario en la aplicación
app.use(session({
    secret: '69420',
    resave: false,
    saveUninitialized: true
}))

// Módulos de la aplicación
const rutaLogin = require('./app/index.js')
const rutaSignup = require('./app/register.js')
const rutaHome = require('./app/home.js')
const rutaLogout = require('./app/logout.js')
const rutaBooks = require('./models/books.js')

app.use('/', rutaLogin)
app.use('/register', rutaSignup)
app.use('/home-page', rutaHome)
app.use('/log-out', rutaLogout)
app.use('/view-books', rutaBooks)

// Escucha de la aplicación
app.listen(puerto, () => {
    console.log(`Aplicación corriendo en el puerto ${puerto}`)
})