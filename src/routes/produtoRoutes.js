const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { ensureRole } = require('../middlewares/authMiddleware');

// Rota para listar produtos (todos podem ver)
router.get('/', produtoController.list);

// Rotas restritas a ADMINISTRADOR
// Rota para exibir formulário de criação
router.get('/novo', ensureRole('ADMINISTRADOR'), produtoController.showCreateForm);

// Rota para criar produto
router.post('/', ensureRole('ADMINISTRADOR'), produtoController.create);

// Rota para exibir formulário de edição
router.get('/:id/editar', ensureRole('ADMINISTRADOR'), produtoController.showEditForm);

// Rota para atualizar produto
router.post('/:id', ensureRole('ADMINISTRADOR'), produtoController.update);

// Rota para excluir produto
router.post('/:id/excluir', ensureRole('ADMINISTRADOR'), produtoController.remove);

module.exports = router;
