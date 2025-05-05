const {Router} = require('express');

const {getVeiculos, addVeiculo, updateVeiculo, getVeiculoPorCodigo, deleteVeiculo} = require('../controllers/veiculoController');

const rotasVeiculos = new Router();

rotasVeiculos.route('/veiculos')
    .get(getVeiculos)
    .post(addVeiculo)
    .put(updateVeiculo)

rotasVeiculos.route('/veiculos/:codigo')
    .get(getVeiculoPorCodigo)
    .delete(deleteVeiculo)


module.exports = {rotasVeiculos};