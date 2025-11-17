/**
 * Middleware para garantir que o usuário está autenticado
 */
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  
  res.redirect('/login');
}

/**
 * Middleware para verificar se o usuário tem um perfil específico
 * @param {string|Array} perfis - perfil(is) permitido(s)
 */
function ensureRole(...perfis) {
  return (req, res, next) => {
    if (!req.session || !req.session.usuario) {
      return res.redirect('/login');
    }
    
    if (perfis.includes(req.session.usuario.perfil)) {
      return next();
    }
    
    // Salva mensagem de erro na sessão
    req.session.erro = 'Acesso negado: você não tem permissão para acessar esta página';
    
    // Tenta redirecionar para a página anterior, senão vai para home
    const referer = req.get('Referer') || '/';
    return res.redirect(referer);
  };
}

module.exports = {
  ensureAuthenticated,
  ensureRole
};
