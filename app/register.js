const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// La colección de usuarios registrados en la BD
const users = require('../models/users')

// Formulario, registro del usuario
router.get('/', (req, res) => {
    res.render('signup')
})

// Registrando un usuario a la BD
router.post('/', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        balance: 500,
    }

    // Revisar si ya existe el usuario en la BD
    const existingUser = await users.findOne({name: data.name})

    if (existingUser) {
        res.send('El usuario ya existe. Por favor selecciona un username diferente.')
        return
    }

    // Hasheando la contraseña
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)
    data.password = hashedPassword

    const userdata = await users.insertMany([data])
    console.log(userdata)
})

// Exportando el enrutador para poder usarlo en main.js
module.exports = router