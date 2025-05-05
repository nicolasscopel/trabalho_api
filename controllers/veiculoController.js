const { deleteVeiculoDB, getVeiculoPorCodigoDB } = require('../usecases/veiculoUseCases');
const { addVeiculoDB, getVeiculosDB, updateVeiculoDB } = require('../usecases/veiculoUseCases');


const getVeiculos = async (request, response) => {
    await getVeiculosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os veiculos: ' + err
        }));
}

const addVeiculo = async (request, response) => {
    await addVeiculoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Veiculo criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateVeiculo = async (request, response) => {
    await updateVeiculoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Veiculo alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteVeiculo = async (request, response) => {
    await deleteVeiculoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getVeiculoPorCodigo= async (request, response) => {
    await getVeiculoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getVeiculos, addVeiculo, updateVeiculo, deleteVeiculo, getVeiculoPorCodigo
}