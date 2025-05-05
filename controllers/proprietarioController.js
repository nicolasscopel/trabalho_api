const { getProprietariosBD, updateProprietarioDB, addProprietarioDB, deleteProprietarioDB, getProprietarioPorCodigoDB } = require('../usecases/proprietarioUseCases');

const getProprietarios = async(request, response) => {
    await getProprietariosBD()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status : 'Error',
            message: 'Erro ao consultar os proprietarios: ' + err
        }));
}

const updateProprietario = async (request, response) => {
    await updateProprietarioDB(request.body)
        .then(data => response.status(200).json({
            "status" : "success" , "message" : "Proprietario atualizado",
            "objeto" : data
        }))
        .catch(err => response.status(400).json ({
            status: 'error',
            message : err
        }))
}

const addProprietario = async (request, response) => {
    await addProprietarioDB(request.body)
        .then(data => response.status(200).json({
            "status" : "success" , "message" : "Proprietario criado",
            "proprietario" : data
        }))
        .catch(err => response.status(400).json ({
            status: 'error',
            message : err
        }))
}

const deleteProprietario = async (request, response) => {
    await deleteProprietarioDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getProprietarioPorCodigo= async (request, response) => {
    await getProprietarioPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}


module.exports = {
    getProprietarios, updateProprietario, addProprietario, getProprietarioPorCodigo, deleteProprietario
}