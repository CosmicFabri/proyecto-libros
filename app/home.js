const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if (!req.session.username) {
        // Si no hay sesión activa, redirigir al login
        return res.redirect('../');
    }

    // Renderizar la página home con el nombre de usuario
    res.render('home', { username: req.session.username, balance: req.session.balance });
});

// Exportando el enrutador para poder usarlo en main.js
module.exports = router