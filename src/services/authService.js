const usuarioRepository = require('../repositories/usuarioRepository');

/**
 * Autentica um usuário
 * @param {string} email - email do usuário
 * @param {string} senha - senha do usuário
 * @returns {Object|null} usuário autenticado ou null se credenciais inválidas
 */
function login(email, senha) {
  const usuario = usuarioRepository.getUsuarioByEmail(email);
  
  if (!usuario) {
    return null;
  }
  
  if (usuario.senha !== senha) {
    return null;
  }
  
  return usuario;
}

module.exports = {
  login
};
