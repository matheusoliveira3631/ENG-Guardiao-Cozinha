/**
 * Middleware para expor variáveis comuns a todas as views
 */
function exposeLocals(req, res, next) {
  // Disponibilizar o usuário da sessão para todas as views
  res.locals.usuario = req.session?.usuario || null;
  next();
}

module.exports = {
  exposeLocals
};
