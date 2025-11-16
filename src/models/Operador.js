const Usuario = require('./Usuario');

/**
 * Classe Operador - representa um usuário operador
 * Responsável por registrar entradas e saídas de estoque
 */
class Operador extends Usuario {
  constructor(id, nome, email, senha) {
    super(id, nome, email, senha, 'OPERADOR');
  }
}

module.exports = Operador;
