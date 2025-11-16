/**
 * Middleware global para tratamento de erros
 */
function errorHandler(err, req, res, next) {
  console.error('Erro:', err);
  
  res.status(err.status || 500);
  res.send(`
    <h1>Erro</h1>
    <p>${err.message || 'Ocorreu um erro inesperado'}</p>
    <a href="/">Voltar para a página inicial</a>
  `);
}

/**
 * Middleware para rotas não encontradas (404)
 */
function notFound(req, res, next) {
  res.status(404).send(`
    <h1>Página não encontrada</h1>
    <p>A página que você procura não existe.</p>
    <a href="/">Voltar para a página inicial</a>
  `);
}

module.exports = {
  errorHandler,
  notFound
};
