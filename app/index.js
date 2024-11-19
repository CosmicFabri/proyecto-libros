// Configurando el módulo para su enrutamiento
const express = require('express')
const router = express.Router()

// Endpoint por defecto: página principal
router.get('/', (req, res) => {
    res.send('Aplicación Concurrencia')
})

// Exportando el enrutador para poder usarlo en main.js
module.exports = router