const { readJson, writeJson } = require('../utils/fileUtils');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/movimentacoes.json');

/**
 * Retorna todas as movimentações
 * @returns {Array} array de movimentações
 */
function getAllMovimentacoes() {
  return readJson(DATA_FILE);
}

/**
 * Retorna movimentações de um usuário específico
 * @param {string|number} usuarioId - ID do usuário
 * @returns {Array} array de movimentações do usuário
 */
function getMovimentacoesByUsuario(usuarioId) {
  const movimentacoes = getAllMovimentacoes();
  return movimentacoes.filter(m => m.usuarioId == usuarioId);
}

/**
 * Retorna movimentações de um produto específico
 * @param {string|number} produtoId - ID do produto
 * @returns {Array} array de movimentações do produto
 */
function getMovimentacoesByProduto(produtoId) {
  const movimentacoes = getAllMovimentacoes();
  return movimentacoes.filter(m => m.produtoId == produtoId);
}

/**
 * Cria uma nova movimentação
 * @param {Object} movimentacaoData - dados da movimentação
 * @returns {Object} movimentação criada
 */
function createMovimentacao(movimentacaoData) {
  const movimentacoes = getAllMovimentacoes();
  movimentacoes.push(movimentacaoData);
  writeJson(DATA_FILE, movimentacoes);
  return movimentacaoData;
}

module.exports = {
  getAllMovimentacoes,
  getMovimentacoesByUsuario,
  getMovimentacoesByProduto,
  createMovimentacao
};
