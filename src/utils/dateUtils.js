/**
 * Formata uma data para o padrão brasileiro (DD/MM/YYYY)
 * @param {string|Date} data - data a ser formatada
 * @returns {string} data formatada
 */
function formatarDataBR(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Formata uma data para o padrão ISO (YYYY-MM-DD)
 * @param {string|Date} data - data a ser formatada
 * @returns {string} data formatada
 */
function formatarDataISO(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

/**
 * Calcula a diferença em dias entre duas datas
 * @param {string|Date} data1 - primeira data
 * @param {string|Date} data2 - segunda data
 * @returns {number} diferença em dias
 */
function diferencaEmDias(data1, data2) {
  const d1 = new Date(data1);
  const d2 = new Date(data2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Retorna a data atual no formato ISO
 * @returns {string} data atual (YYYY-MM-DD)
 */
function dataAtualISO() {
  return formatarDataISO(new Date());
}

module.exports = {
  formatarDataBR,
  formatarDataISO,
  diferencaEmDias,
  dataAtualISO
};
