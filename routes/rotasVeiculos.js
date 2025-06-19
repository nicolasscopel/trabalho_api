const {Router} = require('express');

const {getVeiculos, addVeiculo, updateVeiculo, getVeiculoPorCodigo, deleteVeiculo} = require('../controllers/veiculoController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasVeiculos = new Router();

rotasVeiculos.route('/veiculos')
    .get(verificaJWT, getVeiculos)
    .post(verificaJWT, addVeiculo)
    .put(verificaJWT, updateVeiculo)

rotasVeiculos.route('/veiculos/:codigo')
    .get(verificaJWT, getVeiculoPorCodigo)
    .delete(verificaJWT, deleteVeiculo)


module.exports = {rotasVeiculos};