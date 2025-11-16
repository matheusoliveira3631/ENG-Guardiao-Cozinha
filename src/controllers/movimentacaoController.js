const movimentacaoService = require('../services/movimentacaoService');
const produtoService = require('../services/produtoService');

/**
 * Lista todas as movimentações
 */
function list(req, res) {
  try {
    const filtros = {
      usuarioId: req.query.usuarioId,
      produtoId: req.query.produtoId,
      dataInicio: req.query.dataInicio,
      dataFim: req.query.dataFim
    };
    
    const movimentacoes = movimentacaoService.listarMovimentacoes(filtros);
    res.render('movimentacoes/list', { movimentacoes });
  } catch (erro) {
    res.status(500).send('Erro ao listar movimentações: ' + erro.message);
  }
}

/**
 * Exibe formulário de entrada de estoque
 */
function showEntradaForm(req, res) {
  try {
    const produtos = produtoService.listarProdutos();
    res.render('movimentacoes/entrada', { produtos, erro: null });
  } catch (erro) {
    res.status(500).send('Erro ao carregar formulário: ' + erro.message);
  }
}

/**
 * Registra uma entrada de estoque
 */
function registrarEntrada(req, res) {
  try {
    const { produtoId, quantidade, data } = req.body;
    const usuarioId = req.session.usuario.id;
    
    movimentacaoService.registrarEntrada(produtoId, usuarioId, quantidade, data);
    res.redirect('/movimentacoes');
  } catch (erro) {
    const produtos = produtoService.listarProdutos();
    res.render('movimentacoes/entrada', { produtos, erro: erro.message });
  }
}

/**
 * Exibe formulário de saída de estoque
 */
function showSaidaForm(req, res) {
  try {
    const produtos = produtoService.listarProdutos();
    res.render('movimentacoes/saida', { produtos, erro: null });
  } catch (erro) {
    res.status(500).send('Erro ao carregar formulário: ' + erro.message);
  }
}

/**
 * Registra uma saída de estoque
 */
function registrarSaida(req, res) {
  try {
    const { produtoId, quantidade, data } = req.body;
    const usuarioId = req.session.usuario.id;
    
    movimentacaoService.registrarSaida(produtoId, usuarioId, quantidade, data);
    res.redirect('/movimentacoes');
  } catch (erro) {
    const produtos = produtoService.listarProdutos();
    res.render('movimentacoes/saida', { produtos, erro: erro.message });
  }
}

module.exports = {
  list,
  showEntradaForm,
  registrarEntrada,
  showSaidaForm,
  registrarSaida
};
