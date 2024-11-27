const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// La colección de usuarios registrados en la BD
const collection = require('../models/users')

// Endpoint por defecto: inicio de sesión
router.get('/', (req, res) => {
    res.render('login')
})

// Cuando el usuario inicia sesión
router.post('/', async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username})

        // Verificando el nombre de usuario
        if (!check) {
            res.send('No se ha encontrado un usuario con ese username...')
            return;
        }

        // Comparando la contraseña
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)

        if (isPasswordMatch) {
            res.render('home')
        }
    } catch {
        res.send('Error al iniciar sesión.')
    }
})

// Exportando el enrutador para poder usarlo en main.js
module.exports = router