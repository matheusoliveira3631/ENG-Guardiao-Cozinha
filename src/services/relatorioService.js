const produtoRepository = require('../repositories/produtoRepository');
const movimentacaoRepository = require('../repositories/movimentacaoRepository');
const usuarioRepository = require('../repositories/usuarioRepository');

/**
 * Gera relatório de estoque atual
 * @returns {Array} lista de produtos com suas quantidades
 */
function gerarRelatorioEstoque() {
  return produtoRepository.getAllProdutos();
}

/**
 * Gera relatório de produtos com estoque baixo
 * @param {number} quantidadeMinima - limite de quantidade para considerar em baixa
 * @returns {Array} produtos com quantidade abaixo do limite
 */
function gerarRelatorioProdutosEmBaixa(quantidadeMinima) {
  const produtos = produtoRepository.getAllProdutos();
  return produtos.filter(p => p.quantidade < quantidadeMinima);
}

/**
 * Gera relatório de produtos próximos do vencimento
 * @param {number} diasLimite - número de dias para considerar próximo do vencimento
 * @returns {Array} produtos próximos do vencimento
 */
function gerarRelatorioProdutosProximosDoVencimento(diasLimite) {
  const produtos = produtoRepository.getAllProdutos();
  const hoje = new Date();
  const limiteData = new Date();
  limiteData.setDate(hoje.getDate() + diasLimite);
  
  return produtos.filter(p => {
    const dataValidade = new Date(p.dataValidade);
    return dataValidade <= limiteData && dataValidade >= hoje;
  });
}

/**
 * Gera relatório de movimentações por usuário
 * @param {string|number} usuarioId - ID do usuário
 * @param {Object} periodo - período opcional (dataInicio, dataFim)
 * @returns {Array} movimentações do usuário no período
 */
function gerarRelatorioMovimentacoesPorUsuario(usuarioId, periodo = {}) {
  let movimentacoes = movimentacaoRepository.getMovimentacoesByUsuario(usuarioId);
  
  // Filtrar por período se especificado
  if (periodo.dataInicio) {
    movimentacoes = movimentacoes.filter(m => m.data >= periodo.dataInicio);
  }
  
  if (periodo.dataFim) {
    movimentacoes = movimentacoes.filter(m => m.data <= periodo.dataFim);
  }
  
  return movimentacoes;
}

module.exports = {
  gerarRelatorioEstoque,
  gerarRelatorioProdutosEmBaixa,
  gerarRelatorioProdutosProximosDoVencimento,
  gerarRelatorioMovimentacoesPorUsuario,
  getDashboardResumo
};

/**
 * Consolida dados para os gráficos do dashboard de relatórios
 * - Top 5 produtos mais adicionados
 * - Top 5 produtos mais retirados
 * - Top 5 categorias com mais produtos vencidos
 * - Usuários com mais movimentações
 * @returns {{topEntradas: Array, topSaidas: Array, categoriasVencidos: Array, usuariosMov: Array}}
 */
function getDashboardResumo() {
  const movimentacoes = movimentacaoRepository.getAllMovimentacoes();
  const produtos = produtoRepository.getAllProdutos();
  const usuarios = usuarioRepository.getAllUsuarios();

  const produtoNomeById = new Map(produtos.map(p => [String(p.id), p.nome]));
  const produtoCategoriaById = new Map(produtos.map(p => [String(p.id), p.categoria || 'Sem categoria']));
  const usuarioNomeById = new Map(usuarios.map(u => [String(u.id), u.nome]));

  const somaEntradaPorProduto = new Map();
  const somaSaidaPorProduto = new Map();
  const contagemMovPorUsuario = new Map();

  for (const m of movimentacoes) {
    const pid = String(m.produtoId);
    const uid = String(m.usuarioId);
    const qtd = Number(m.quantidade) || 0;

    if (m.tipo === 'ENTRADA') {
      somaEntradaPorProduto.set(pid, (somaEntradaPorProduto.get(pid) || 0) + qtd);
    } else if (m.tipo === 'SAIDA') {
      somaSaidaPorProduto.set(pid, (somaSaidaPorProduto.get(pid) || 0) + qtd);
    }

    contagemMovPorUsuario.set(uid, (contagemMovPorUsuario.get(uid) || 0) + 1);
  }

  // Top 5 helpers
  const toTopArray = (map, labelMap, top = 5) => Array.from(map.entries())
    .sort((a,b) => b[1] - a[1])
    .slice(0, top)
    .map(([id, value]) => ({ label: labelMap.get(String(id)) || String(id), value }));

  const topEntradas = toTopArray(somaEntradaPorProduto, produtoNomeById, 5);
  const topSaidas = toTopArray(somaSaidaPorProduto, produtoNomeById, 5);

  // Categorias com mais vencidos
  const hoje = new Date();
  const contagemVencidosPorCategoria = new Map();
  for (const p of produtos) {
    const validade = p.dataValidade ? new Date(p.dataValidade) : null;
    if (validade && validade < hoje) {
      const cat = p.categoria || 'Sem categoria';
      contagemVencidosPorCategoria.set(cat, (contagemVencidosPorCategoria.get(cat) || 0) + 1);
    }
  }
  const categoriasVencidos = Array.from(contagemVencidosPorCategoria.entries())
    .sort((a,b) => b[1] - a[1])
    .slice(0,5)
    .map(([label, value]) => ({ label, value }));

  const usuariosMov = Array.from(contagemMovPorUsuario.entries())
    .sort((a,b) => b[1] - a[1])
    .slice(0,5)
    .map(([id, value]) => ({ label: usuarioNomeById.get(String(id)) || String(id), value }));

  return { topEntradas, topSaidas, categoriasVencidos, usuariosMov };
}
