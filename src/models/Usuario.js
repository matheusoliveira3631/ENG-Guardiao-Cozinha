/**
 * Classe Usuario - representa um usuário genérico do sistema
 */
class Usuario {
  constructor(id, nome, email, senha, perfil) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.perfil = perfil;
  }

  /**
   * Valida se a senha fornecida corresponde à senha armazenada
   * @param {string} senhaPlana - senha em texto plano para validar
   * @returns {boolean} true se a senha é válida
   */
  validarSenha(senhaPlana) {
    return this.senha === senhaPlana;
  }
}

module.exports = Usuario;
