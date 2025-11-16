// JavaScript principal para Guardião da Cozinha

// Confirmação antes de excluir
function confirmarExclusao(mensagem) {
  return confirm(mensagem || 'Tem certeza que deseja excluir este item?');
}

// Validação de formulário de produto
function validarFormularioProduto() {
  const nome = document.getElementById('nome');
  const quantidade = document.getElementById('quantidade');
  
  if (nome && nome.value.trim() === '') {
    alert('Por favor, preencha o nome do produto');
    nome.focus();
    return false;
  }
  
  if (quantidade && quantidade.value < 0) {
    alert('A quantidade não pode ser negativa');
    quantidade.focus();
    return false;
  }
  
  return true;
}

// Validação de formulário de movimentação
function validarFormularioMovimentacao() {
  const produtoId = document.getElementById('produtoId');
  const quantidade = document.getElementById('quantidade');
  
  if (produtoId && produtoId.value === '') {
    alert('Por favor, selecione um produto');
    produtoId.focus();
    return false;
  }
  
  if (quantidade && quantidade.value <= 0) {
    alert('A quantidade deve ser maior que zero');
    quantidade.focus();
    return false;
  }
  
  return true;
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  console.log('Guardião da Cozinha inicializado');
});
