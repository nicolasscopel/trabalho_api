const { Router } = require('express')
const { rotasProprietarios } = require('./rotasProprietarios');
const { rotasVeiculos}  = require('./rotasVeiculos');
const { rotasLocacoes }  = require('./rotasLocacoes');
const { rotasSeguranca } = require('./rotasSeguranca')
const {login} = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasProprietarios);
rotas.use(rotasVeiculos);
rotas.use(rotasLocacoes);
rotas.use(rotasSeguranca);

rotas.route("/login")
    .post(login);

module.exports = rotas;