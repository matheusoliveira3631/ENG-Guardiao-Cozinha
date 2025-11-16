const Usuario = require('./Usuario');

/**
 * Classe Administrador - representa um usuário administrador
 * Responsável por gerenciar produtos e usuários
 */
class Administrador extends Usuario {
  constructor(id, nome, email, senha) {
    super(id, nome, email, senha, 'ADMINISTRADOR');
  }
}

module.exports = Administrador;
