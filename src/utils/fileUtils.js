const fs = require('fs');
const path = require('path');

/**
 * Lê um arquivo JSON e retorna seu conteúdo como array
 * @param {string} filePath - caminho do arquivo JSON
 * @returns {Array} conteúdo do arquivo ou array vazio se não existir
 */
function readJson(filePath) {
  try {
    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Se o arquivo estiver vazio, retorna array vazio
    if (!data || data.trim() === '') {
      return [];
    }
    
    return JSON.parse(data);
  } catch (erro) {
    console.error('Erro ao ler arquivo JSON:', erro);
    return [];
  }
}

/**
 * Escreve dados em um arquivo JSON
 * @param {string} filePath - caminho do arquivo JSON
 * @param {Array|Object} data - dados a serem escritos
 */
function writeJson(filePath, data) {
  try {
    // Garante que o diretório existe
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Escreve os dados formatados no arquivo
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (erro) {
    console.error('Erro ao escrever arquivo JSON:', erro);
    throw erro;
  }
}

module.exports = {
  readJson,
  writeJson
};
