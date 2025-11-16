const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar produtos
router.get('/', produtoController.list);

// Rota para exibir formulário de criação
router.get('/novo', produtoController.showCreateForm);

// Rota para criar produto
router.post('/', produtoController.create);

// Rota para exibir formulário de edição
router.get('/:id/editar', produtoController.showEditForm);

// Rota para atualizar produto
router.post('/:id', produtoController.update);

// Rota para excluir produto
router.post('/:id/excluir', produtoController.remove);

module.exports = router;
