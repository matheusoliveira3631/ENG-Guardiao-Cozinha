/**
 * Classe Movimentacao - representa uma movimentação de estoque (entrada ou saída)
 */
class Movimentacao {
  constructor(id, produtoId, usuarioId, tipo, quantidade, data) {
    this.id = id;
    this.produtoId = produtoId;
    this.usuarioId = usuarioId;
    this.tipo = tipo; // TipoMovimentacao.ENTRADA ou TipoMovimentacao.SAIDA
    this.quantidade = quantidade;
    this.data = data; // string de data
  }
}

module.exports = Movimentacao;
