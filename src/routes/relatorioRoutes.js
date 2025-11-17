const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');
const { ensureRole } = require('../middlewares/authMiddleware');

// Rotas restritas a ADMINISTRADOR e GESTOR
// Dashboard principal de relatórios
router.get('/', ensureRole('ADMINISTRADOR', 'GESTOR'), relatorioController.dashboard);

// Rota para relatório de estoque
router.get('/estoque', ensureRole('ADMINISTRADOR', 'GESTOR'), relatorioController.estoque);

// Rota para relatório de produtos em baixa
router.get('/produtos-em-baixa', ensureRole('ADMINISTRADOR', 'GESTOR'), relatorioController.produtosEmBaixa);

// Rota para relatório de produtos próximos do vencimento
router.get('/produtos-proximos-vencimento', ensureRole('ADMINISTRADOR', 'GESTOR'), relatorioController.produtosProximosVencimento);

// Rota para relatório de movimentações por usuário
router.get('/movimentacoes-usuario', ensureRole('ADMINISTRADOR', 'GESTOR'), relatorioController.movimentacoesPorUsuario);

module.exports = router;
