const { Router } = require('express');

const { getProprietarios, updateProprietario, addProprietario, deleteProprietario, getProprietarioPorCodigo } = require('../controllers/proprietarioController');

const {verificaJWT} = require('../controllers/segurancaController')



const rotasProprietarios = new Router();

rotasProprietarios.route('/proprietarios')
   .get(verificaJWT, getProprietarios)
   .put(verificaJWT, updateProprietario)
   .post(verificaJWT, addProprietario)

rotasProprietarios.route('/proprietarios/:codigo')
   .delete(verificaJWT,deleteProprietario)
   .get(verificaJWT,getProprietarioPorCodigo)

module.exports = { rotasProprietarios };