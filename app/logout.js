const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión.');
        }

        // Devolver un código de éxito
        console.log('200: Se ha cerrado la sesión')

        res.redirect('../');
    });
});

// Exportando el enrutador para poder usarlo en main.js
module.exports = router