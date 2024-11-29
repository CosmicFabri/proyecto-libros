const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// La colección de usuarios registrados en la BD
const users = require('../models/users')

// Endpoint por defecto: inicio de sesión
router.get('/', (req, res) => {
    res.render('login')
})

// Endpoint POST para iniciar sesión
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario por nombre
        const user = await users.findOne({ name: username });
        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }

        // Comparar contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Contraseña incorrecta.');
        }

        // Guardar datos en la sesión
        req.session.userId = user._id;
        req.session.username = user.name;
        req.session.balance = user.balance;

        // Devolver un código de éxito
        console.log(`200: ${user.name} ha iniciado sesión.`)

        // Redirigir al home
        res.redirect('../home-page');
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Ocurrió un error al iniciar sesión.');
    }
})

// Exportando el enrutador para poder usarlo en main.js
module.exports = router