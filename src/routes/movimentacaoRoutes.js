const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');

// Rota para listar movimentações
router.get('/', movimentacaoController.list);

// Rota para exibir formulário de entrada
router.get('/entrada', movimentacaoController.showEntradaForm);

// Rota para registrar entrada
router.post('/entrada', movimentacaoController.registrarEntrada);

// Rota para exibir formulário de saída
router.get('/saida', movimentacaoController.showSaidaForm);

// Rota para registrar saída
router.post('/saida', movimentacaoController.registrarSaida);

module.exports = router;
