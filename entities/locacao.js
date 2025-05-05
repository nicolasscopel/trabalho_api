class Locacao {
    constructor(codigo,data_retirada, data_retorno, veiculo, veiculo_modelo){
        this.codigo = codigo;
        this.data_retirada = data_retirada;
        this.data_retorno = data_retorno;
        this.veiculo = veiculo;
        this.veiculo_modelo = veiculo_modelo

    }
}

module.exports = Locacao;