const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');
const { ensureRole } = require('../middlewares/authMiddleware');

// Rota para listar movimentações (todos podem ver)
router.get('/', movimentacaoController.list);

// Rotas restritas a ADMINISTRADOR e OPERADOR
// Rota para exibir formulário de entrada
router.get('/entrada', ensureRole('ADMINISTRADOR', 'OPERADOR'), movimentacaoController.showEntradaForm);

// Rota para registrar entrada
router.post('/entrada', ensureRole('ADMINISTRADOR', 'OPERADOR'), movimentacaoController.registrarEntrada);

// Rota para exibir formulário de saída
router.get('/saida', ensureRole('ADMINISTRADOR', 'OPERADOR'), movimentacaoController.showSaidaForm);

// Rota para registrar saída
router.post('/saida', ensureRole('ADMINISTRADOR', 'OPERADOR'), movimentacaoController.registrarSaida);

module.exports = router;
