class Proprietario {
    constructor(codigo,nome,cpf,rg,email,telefone){
        this.codigo = codigo;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.email = email;
        this.telefone = telefone;
    }
}

module.exports = Proprietario;