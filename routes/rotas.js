const { Router } = require('express')
const { rotasProprietarios } = require('./rotasProprietarios');
const { rotasVeiculos}  = require('./rotasVeiculos');
const { rotasLocacoes }  = require('./rotasLocacoes');

const rotas = new Router();

rotas.use(rotasProprietarios);
rotas.use(rotasVeiculos);
rotas.use(rotasLocacoes);

module.exports = rotas;