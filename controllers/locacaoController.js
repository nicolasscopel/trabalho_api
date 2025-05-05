const { getLocacoesDB, addLocacaoDB, updateLocacaoDB, deleteLocacaoDB, getLocacaoPorCodigoDB } = require('../usecases/locacaoUseCases');

const getLocacoes = async (request, response) => {
    await getLocacoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os locações: ' + err
        }));
}

const addLocacao = async (request, response) => {
    await addLocacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Locação criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateLocacao = async (request, response) => {
    await updateLocacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Locação alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteLocacao = async (request, response) => {
    await deleteLocacaoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getLocacaoPorCodigo= async (request, response) => {
    await getLocacaoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getLocacoes, addLocacao, updateLocacao, deleteLocacao, getLocacaoPorCodigo
}