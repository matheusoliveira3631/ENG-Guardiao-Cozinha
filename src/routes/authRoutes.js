const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para exibir formulário de login
router.get('/login', authController.showLoginForm);

// Rota para processar login
router.post('/login', authController.login);

// Rota para logout
router.get('/logout', authController.logout);

module.exports = router;
