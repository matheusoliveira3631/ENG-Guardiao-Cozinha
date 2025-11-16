const { readJson, writeJson } = require('../utils/fileUtils');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/usuarios.json');

/**
 * Retorna todos os usuários
 * @returns {Array} array de usuários
 */
function getAllUsuarios() {
  return readJson(DATA_FILE);
}

/**
 * Retorna um usuário pelo ID
 * @param {string|number} id - ID do usuário
 * @returns {Object|null} usuário encontrado ou null
 */
function getUsuarioById(id) {
  const usuarios = getAllUsuarios();
  return usuarios.find(u => u.id == id) || null;
}

/**
 * Retorna um usuário pelo email
 * @param {string} email - email do usuário
 * @returns {Object|null} usuário encontrado ou null
 */
function getUsuarioByEmail(email) {
  const usuarios = getAllUsuarios();
  return usuarios.find(u => u.email === email) || null;
}

/**
 * Cria um novo usuário
 * @param {Object} usuarioData - dados do usuário
 * @returns {Object} usuário criado
 */
function createUsuario(usuarioData) {
  const usuarios = getAllUsuarios();
  usuarios.push(usuarioData);
  writeJson(DATA_FILE, usuarios);
  return usuarioData;
}

/**
 * Atualiza um usuário existente
 * @param {string|number} id - ID do usuário
 * @param {Object} newData - novos dados do usuário
 * @returns {Object|null} usuário atualizado ou null se não encontrado
 */
function updateUsuario(id, newData) {
  const usuarios = getAllUsuarios();
  const index = usuarios.findIndex(u => u.id == id);
  
  if (index === -1) return null;
  
  usuarios[index] = { ...usuarios[index], ...newData };
  writeJson(DATA_FILE, usuarios);
  return usuarios[index];
}

/**
 * Deleta um usuário
 * @param {string|number} id - ID do usuário
 * @returns {boolean} true se deletado, false se não encontrado
 */
function deleteUsuario(id) {
  const usuarios = getAllUsuarios();
  const index = usuarios.findIndex(u => u.id == id);
  
  if (index === -1) return false;
  
  usuarios.splice(index, 1);
  writeJson(DATA_FILE, usuarios);
  return true;
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
