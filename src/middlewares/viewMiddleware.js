/**
 * Middleware para expor variáveis comuns a todas as views
 */
function exposeLocals(req, res, next) {
  // Disponibilizar o usuário da sessão para todas as views
  res.locals.usuario = req.session?.usuario || null;
  
  // Expor mensagens de erro/sucesso da sessão (flash messages)
  res.locals.erro = req.session?.erro || null;
  res.locals.sucesso = req.session?.sucesso || null;
  
  // Limpar mensagens após serem expostas (consumir uma única vez)
  if (req.session) {
    delete req.session.erro;
    delete req.session.sucesso;
  }
  
  next();
}

module.exports = {
  exposeLocals
};
