const {Router} = require('express');

const {getLocacoes, addLocacao, updateLocacao, getLocacaoPorCodigo, deleteLocacao} = require('../controllers/locacaoController');

const {verificaJWT} = require('../controllers/segurancaController');

const rotasLocacoes = new Router();

rotasLocacoes.route('/locacoes')
    .get(verificaJWT, getLocacoes)
    .post(verificaJWT, addLocacao)
    .put(verificaJWT, updateLocacao)

rotasLocacoes.route('/locacoes/:codigo')
    .get(verificaJWT, getLocacaoPorCodigo)
    .delete(verificaJWT, deleteLocacao)


module.exports = {rotasLocacoes};