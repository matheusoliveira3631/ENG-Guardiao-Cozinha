const authService = require('../services/authService');

/**
 * Exibe o formulário de login
 */
function showLoginForm(req, res) {
  res.render('auth/login', { erro: null });
}

/**
 * Processa o login do usuário
 */
function login(req, res) {
  const { email, senha } = req.body;
  
  try {
    const usuario = authService.login(email, senha);
    
    if (!usuario) {
      return res.render('auth/login', { erro: 'Email ou senha inválidos' });
    }
    
    // Armazenar usuário na sessão
    req.session.usuario = usuario;
    
    // Redirecionar para página principal
    res.redirect('/produtos');
  } catch (erro) {
    res.render('auth/login', { erro: erro.message });
  }
}

/**
 * Faz logout do usuário
 */
function logout(req, res) {
  req.session.destroy();
  res.redirect('/login');
}

module.exports = {
  showLoginForm,
  login,
  logout
};
