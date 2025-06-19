const { Router } = require('express');

const { addUsuario, verificaJWT, getMeuUsuario, updateMeuUsuario } = require('../controllers/segurancaController');

//const {verificaJWT} = require('../controllers/segurancaController');

const rotasSeguranca = new Router();

rotasSeguranca.route('/usuarios')
   .post(addUsuario)

rotasSeguranca.route('/usuarios/me')
   .get(verificaJWT, getMeuUsuario)
   .put(verificaJWT,updateMeuUsuario)

module.exports = {rotasSeguranca};