const Usuario = require('./Usuario');

/**
 * Classe Gestor - representa um usuário gestor
 * Responsável por visualizar relatórios e analisar uso de estoque
 */
class Gestor extends Usuario {
  constructor(id, nome, email, senha) {
    super(id, nome, email, senha, 'GESTOR');
  }
}

module.exports = Gestor;
