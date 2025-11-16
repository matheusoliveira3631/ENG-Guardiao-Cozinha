const produtoService = require('../services/produtoService');

/**
 * Lista todos os produtos
 */
function list(req, res) {
  try {
    const produtos = produtoService.listarProdutos();
    res.render('produtos/list', { produtos });
  } catch (erro) {
    res.status(500).send('Erro ao listar produtos: ' + erro.message);
  }
}

/**
 * Exibe formulário de criação de produto
 */
function showCreateForm(req, res) {
  res.render('produtos/create', { erro: null });
}

/**
 * Cria um novo produto
 */
function create(req, res) {
  try {
    const dadosProduto = {
      nome: req.body.nome,
      categoria: req.body.categoria,
      quantidade: req.body.quantidade,
      dataValidade: req.body.dataValidade
    };
    
    produtoService.criarProduto(dadosProduto);
    res.redirect('/produtos');
  } catch (erro) {
    res.render('produtos/create', { erro: erro.message });
  }
}

/**
 * Exibe formulário de edição de produto
 */
function showEditForm(req, res) {
  try {
    const id = req.params.id;
    const produto = produtoService.obterProduto(id);
    
    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }
    
    res.render('produtos/edit', { produto, erro: null });
  } catch (erro) {
    res.status(500).send('Erro ao carregar produto: ' + erro.message);
  }
}

/**
 * Atualiza um produto existente
 */
function update(req, res) {
  try {
    const id = req.params.id;
    const dadosProduto = {
      nome: req.body.nome,
      categoria: req.body.categoria,
      quantidade: req.body.quantidade,
      dataValidade: req.body.dataValidade
    };
    
    const produtoAtualizado = produtoService.atualizarProduto(id, dadosProduto);
    
    if (!produtoAtualizado) {
      return res.status(404).send('Produto não encontrado');
    }
    
    res.redirect('/produtos');
  } catch (erro) {
    const produto = produtoService.obterProduto(req.params.id);
    res.render('produtos/edit', { produto, erro: erro.message });
  }
}

/**
 * Remove um produto
 */
function remove(req, res) {
  try {
    const id = req.params.id;
    const deletado = produtoService.excluirProduto(id);
    
    if (!deletado) {
      return res.status(404).send('Produto não encontrado');
    }
    
    res.redirect('/produtos');
  } catch (erro) {
    res.status(500).send('Erro ao excluir produto: ' + erro.message);
  }
}

module.exports = {
  list,
  showCreateForm,
  create,
  showEditForm,
  update,
  remove
};
