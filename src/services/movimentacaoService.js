const movimentacaoRepository = require('../repositories/movimentacaoRepository');
const produtoRepository = require('../repositories/produtoRepository');
const usuarioRepository = require('../repositories/usuarioRepository'); // Adicionado
const TipoMovimentacao = require('../models/TipoMovimentacao');

/**
 * Registra uma entrada de estoque
 * @param {string|number} produtoId - ID do produto
 * @param {string|number} usuarioId - ID do usuário que registra
 * @param {number} quantidade - quantidade a adicionar
 * @param {string} data - data da movimentação
 * @returns {Object} movimentação criada
 * @throws {Error} se produto não existir ou validação falhar
 */
function registrarEntrada(produtoId, usuarioId, quantidade, data) {
  // Validar que o produto existe
  const produto = produtoRepository.getProdutoById(produtoId);
  
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  
  if (quantidade <= 0) {
    throw new Error('Quantidade deve ser maior que zero');
  }
  
  // Gerar ID para a movimentação
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  // Criar movimentação
  const movimentacao = {
    id,
    produtoId,
    usuarioId,
    tipo: TipoMovimentacao.ENTRADA,
    quantidade: Number(quantidade),
    data: data || new Date().toISOString()
  };
  
  // Atualizar estoque do produto
  const novaQuantidade = produto.quantidade + Number(quantidade);
  produtoRepository.updateProduto(produtoId, { quantidade: novaQuantidade });
  
  // Persistir movimentação
  return movimentacaoRepository.createMovimentacao(movimentacao);
}

/**
 * Registra uma saída de estoque
 * @param {string|number} produtoId - ID do produto
 * @param {string|number} usuarioId - ID do usuário que registra
 * @param {number} quantidade - quantidade a remover
 * @param {string} data - data da movimentação
 * @returns {Object} movimentação criada
 * @throws {Error} se produto não existir, estoque insuficiente ou validação falhar
 */
function registrarSaida(produtoId, usuarioId, quantidade, data) {
  // Validar que o produto existe
  const produto = produtoRepository.getProdutoById(produtoId);
  
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  
  if (quantidade <= 0) {
    throw new Error('Quantidade deve ser maior que zero');
  }
  
  // Validar estoque suficiente
  if (produto.quantidade < quantidade) {
    throw new Error('Estoque insuficiente para realizar a saída');
  }
  
  // Gerar ID para a movimentação
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  // Criar movimentação
  const movimentacao = {
    id,
    produtoId,
    usuarioId,
    tipo: TipoMovimentacao.SAIDA,
    quantidade: Number(quantidade),
    data: data || new Date().toISOString()
  };
  
  // Atualizar estoque do produto
  const novaQuantidade = produto.quantidade - Number(quantidade);
  produtoRepository.updateProduto(produtoId, { quantidade: novaQuantidade });
  
  // Persistir movimentação
  return movimentacaoRepository.createMovimentacao(movimentacao);
}

/**
 * Lista movimentações com filtros opcionais
 * @param {Object} filtros - filtros opcionais (usuarioId, produtoId, dataInicio, dataFim)
 * @returns {Array} array de movimentações
 */
function listarMovimentacoes(filtros = {}) {
  let movimentacoes = movimentacaoRepository.getAllMovimentacoes();
  
  // Filtrar por usuário se especificado
  if (filtros.usuarioId) {
    movimentacoes = movimentacoes.filter(m => m.usuarioId == filtros.usuarioId);
  }
  
  // Filtrar por produto se especificado
  if (filtros.produtoId) {
    movimentacoes = movimentacoes.filter(m => m.produtoId == filtros.produtoId);
  }
  
  // Filtrar por período se especificado
  if (filtros.dataInicio) {
    movimentacoes = movimentacoes.filter(m => m.data >= filtros.dataInicio);
  }
  
  if (filtros.dataFim) {
    movimentacoes = movimentacoes.filter(m => m.data <= filtros.dataFim);
  }

  // Enriquecer movimentações com nomes de produto e usuário
  const movimentacoesEnriquecidas = movimentacoes.map(m => {
    const produto = produtoRepository.getProdutoById(m.produtoId);
    const usuario = usuarioRepository.getUsuarioById(m.usuarioId);
    return {
      ...m,
      produtoNome: produto ? produto.nome : 'Produto não encontrado',
      usuarioNome: usuario ? usuario.nome : 'Usuário não encontrado'
    };
  });
  
  return movimentacoesEnriquecidas;
}

module.exports = {
  registrarEntrada,
  registrarSaida,
  listarMovimentacoes
};
