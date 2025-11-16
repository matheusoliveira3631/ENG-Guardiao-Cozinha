const { readJson, writeJson } = require('../utils/fileUtils');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/produtos.json');

/**
 * Retorna todos os produtos
 * @returns {Array} array de produtos
 */
function getAllProdutos() {
  return readJson(DATA_FILE);
}

/**
 * Retorna um produto pelo ID
 * @param {string|number} id - ID do produto
 * @returns {Object|null} produto encontrado ou null
 */
function getProdutoById(id) {
  const produtos = getAllProdutos();
  return produtos.find(p => p.id == id) || null;
}

/**
 * Cria um novo produto
 * @param {Object} produtoData - dados do produto
 * @returns {Object} produto criado
 */
function createProduto(produtoData) {
  const produtos = getAllProdutos();
  produtos.push(produtoData);
  writeJson(DATA_FILE, produtos);
  return produtoData;
}

/**
 * Atualiza um produto existente
 * @param {string|number} id - ID do produto
 * @param {Object} newData - novos dados do produto
 * @returns {Object|null} produto atualizado ou null se não encontrado
 */
function updateProduto(id, newData) {
  const produtos = getAllProdutos();
  const index = produtos.findIndex(p => p.id == id);
  
  if (index === -1) return null;
  
  produtos[index] = { ...produtos[index], ...newData };
  writeJson(DATA_FILE, produtos);
  return produtos[index];
}

/**
 * Deleta um produto
 * @param {string|number} id - ID do produto
 * @returns {boolean} true se deletado, false se não encontrado
 */
function deleteProduto(id) {
  const produtos = getAllProdutos();
  const index = produtos.findIndex(p => p.id == id);
  
  if (index === -1) return false;
  
  produtos.splice(index, 1);
  writeJson(DATA_FILE, produtos);
  return true;
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
};
