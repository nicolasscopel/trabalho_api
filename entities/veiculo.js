class Veiculo {
    constructor(codigo, modelo, disponível, ano, proprietario, proprietario_nome) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.disponivel = disponível;
        this.ano = ano;
        this.proprietario = proprietario;
        this.proprietario_nome = proprietario_nome;
    }
}

module.exports = Veiculo;