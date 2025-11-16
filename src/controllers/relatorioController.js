const relatorioService = require('../services/relatorioService');

/**
 * Exibe dashboard consolidado de relatórios com gráficos
 */
function dashboard(req, res) {
  try {
    const dados = relatorioService.getDashboardResumo();
    res.render('relatorios/dashboard', { 
      pageTitle: 'Relatórios',
      activeMenu: 'relatorios',
      ...dados 
    });
  } catch (erro) {
    res.status(500).send('Erro ao gerar relatório: ' + erro.message);
  }
}

/**
 * Exibe relatório de estoque
 */
function estoque(req, res) {
  try {
    const produtos = relatorioService.gerarRelatorioEstoque();
    res.render('relatorios/estoque', { produtos });
  } catch (erro) {
    res.status(500).send('Erro ao gerar relatório: ' + erro.message);
  }
}

/**
 * Exibe relatório de produtos em baixa
 */
function produtosEmBaixa(req, res) {
  try {
    const quantidadeMinima = req.query.minimo || 10;
    const produtos = relatorioService.gerarRelatorioProdutosEmBaixa(quantidadeMinima);
    res.render('relatorios/produtosEmBaixa', { produtos, quantidadeMinima });
  } catch (erro) {
    res.status(500).send('Erro ao gerar relatório: ' + erro.message);
  }
}

/**
 * Exibe relatório de produtos próximos do vencimento
 */
function produtosProximosVencimento(req, res) {
  try {
    const diasLimite = req.query.dias || 30;
    const produtos = relatorioService.gerarRelatorioProdutosProximosDoVencimento(diasLimite);
    res.render('relatorios/produtosProximosVencimento', { produtos, diasLimite });
  } catch (erro) {
    res.status(500).send('Erro ao gerar relatório: ' + erro.message);
  }
}

/**
 * Exibe relatório de movimentações por usuário
 */
function movimentacoesPorUsuario(req, res) {
  try {
    const usuarioId = req.query.usuarioId || req.session.usuario.id;
    const periodo = {
      dataInicio: req.query.dataInicio,
      dataFim: req.query.dataFim
    };
    
    const movimentacoes = relatorioService.gerarRelatorioMovimentacoesPorUsuario(usuarioId, periodo);
    res.render('relatorios/movimentacoesUsuario', { movimentacoes, usuarioId });
  } catch (erro) {
    res.status(500).send('Erro ao gerar relatório: ' + erro.message);
  }
}

module.exports = {
  dashboard,
  estoque,
  produtosEmBaixa,
  produtosProximosVencimento,
  movimentacoesPorUsuario
};
