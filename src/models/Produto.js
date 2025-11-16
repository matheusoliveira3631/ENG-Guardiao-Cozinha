/**
 * Classe Produto - representa um produto do estoque
 */
class Produto {
  constructor(id, nome, categoria, quantidade, dataValidade) {
    this.id = id;
    this.nome = nome;
    this.categoria = categoria;
    this.quantidade = quantidade;
    this.dataValidade = dataValidade; // formato 'YYYY-MM-DD' ou ISO
  }
}

module.exports = Produto;
