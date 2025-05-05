const { Router } = require('express');

const { getProprietarios, updateProprietario, addProprietario, deleteProprietario, getProprietarioPorCodigo } = require('../controllers/proprietarioController');


const rotasProprietarios = new Router();

rotasProprietarios.route('/proprietarios')
   .get(getProprietarios)
   .put(updateProprietario)
   .post(addProprietario)

rotasProprietarios.route('/proprietarios/:codigo')
   .delete(deleteProprietario)
   .get(getProprietarioPorCodigo)

module.exports = { rotasProprietarios };