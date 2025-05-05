const {Router} = require('express');

const {getLocacoes, addLocacao, updateLocacao, getLocacaoPorCodigo, deleteLocacao} = require('../controllers/locacaoController');

const rotasLocacoes = new Router();

rotasLocacoes.route('/locacoes')
    .get(getLocacoes)
    .post(addLocacao)
    .put(updateLocacao)

rotasLocacoes.route('/locacoes/:codigo')
    .get(getLocacaoPorCodigo)
    .delete(deleteLocacao)


module.exports = {rotasLocacoes};