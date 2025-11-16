const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Dashboard principal de relatórios
router.get('/', relatorioController.dashboard);

// Rota para relatório de estoque
router.get('/estoque', relatorioController.estoque);

// Rota para relatório de produtos em baixa
router.get('/produtos-em-baixa', relatorioController.produtosEmBaixa);

// Rota para relatório de produtos próximos do vencimento
router.get('/produtos-proximos-vencimento', relatorioController.produtosProximosVencimento);

// Rota para relatório de movimentações por usuário
router.get('/movimentacoes-usuario', relatorioController.movimentacoesPorUsuario);

module.exports = router;
