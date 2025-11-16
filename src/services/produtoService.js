const produtoRepository = require('../repositories/produtoRepository');
const movimentacaoRepository = require('../repositories/movimentacaoRepository');

/**
 * Lista todos os produtos
 * @returns {Array} array de produtos
 */
function listarProdutos() {
  const produtos = produtoRepository.getAllProdutos();
  return produtos.map(p => {
    const quantidade = Number(p.quantidade || 0);
    const estoqueMinimo = Number(p.estoqueMinimo || 0);
    let statusLabel = 'OK';
    let statusColor = 'bg-emerald-100 text-emerald-700';
    if (estoqueMinimo > 0) {
      if (quantidade < estoqueMinimo) {
        statusLabel = 'Abaixo do mínimo';
        statusColor = 'bg-red-100 text-red-700';
      } else if (quantidade <= estoqueMinimo + 5) {
        statusLabel = 'Próximo do mínimo';
        statusColor = 'bg-amber-100 text-amber-700';
      } else {
        statusLabel = 'Acima do mínimo';
        statusColor = 'bg-emerald-100 text-emerald-700';
      }
    }
    return { ...p, quantidade, estoqueMinimo, statusLabel, statusColor };
  });
}

/**
 * Obtém um produto por ID
 * @param {string|number} id - ID do produto
 * @returns {Object|null} produto encontrado ou null
 */
function obterProduto(id) {
  return produtoRepository.getProdutoById(id);
}

/**
 * Cria um novo produto
 * @param {Object} dadosProduto - dados do produto (nome, categoria, quantidade, dataValidade)
 * @returns {Object} produto criado
 * @throws {Error} se campos obrigatórios estiverem faltando
 */
function criarProduto(dadosProduto) {
  // Validação de campos obrigatórios
  if (!dadosProduto.nome || !dadosProduto.categoria || 
      dadosProduto.quantidade === undefined || !dadosProduto.dataValidade || dadosProduto.estoqueMinimo === undefined) {
    throw new Error('Campos obrigatórios faltando: nome, categoria, quantidade, dataValidade, estoqueMinimo');
  }
  
  // Gerar ID simples (timestamp + random)
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  const novoProduto = {
    id,
    nome: dadosProduto.nome,
    categoria: dadosProduto.categoria,
    quantidade: Number(dadosProduto.quantidade),
    estoqueMinimo: Math.max(0, Number(dadosProduto.estoqueMinimo)),
    dataValidade: dadosProduto.dataValidade
  };
  
  return produtoRepository.createProduto(novoProduto);
}

/**
 * Atualiza um produto existente
 * @param {string|number} id - ID do produto
 * @param {Object} dadosProduto - novos dados do produto
 * @returns {Object|null} produto atualizado ou null se não encontrado
 * @throws {Error} se campos obrigatórios estiverem faltando
 */
function atualizarProduto(id, dadosProduto) {
  const produtoExistente = produtoRepository.getProdutoById(id);
  
  if (!produtoExistente) {
    return null;
  }
  
  // Validação de campos obrigatórios
  if (!dadosProduto.nome || !dadosProduto.categoria || 
      dadosProduto.quantidade === undefined || !dadosProduto.dataValidade || dadosProduto.estoqueMinimo === undefined) {
    throw new Error('Campos obrigatórios faltando: nome, categoria, quantidade, dataValidade, estoqueMinimo');
  }
  
  const dadosAtualizados = {
    nome: dadosProduto.nome,
    categoria: dadosProduto.categoria,
    quantidade: Number(dadosProduto.quantidade),
    estoqueMinimo: Math.max(0, Number(dadosProduto.estoqueMinimo)),
    dataValidade: dadosProduto.dataValidade
  };
  
  return produtoRepository.updateProduto(id, dadosAtualizados);
}

/**
 * Exclui um produto
 * @param {string|number} id - ID do produto
 * @returns {boolean} true se deletado, false se não encontrado
 * @throws {Error} se houver movimentações associadas ao produto
 */
function excluirProduto(id) {
  // Verificar se há movimentações associadas
  const movimentacoes = movimentacaoRepository.getMovimentacoesByProduto(id);
  
  if (movimentacoes.length > 0) {
    throw new Error('Não é possível excluir produto com movimentações associadas');
  }
  
  return produtoRepository.deleteProduto(id);
}

module.exports = {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  excluirProduto
};
