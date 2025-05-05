const { pool } = require('../config');
const Veiculo  = require('../entities/veiculo');


const getVeiculosDB = async () => {
    try {    
        const { rows } = await pool.query(`select v.codigo as codigo, v.modelo as modelo, v.disponivel as disponivel, v.ano as ano, 
         v.proprietario as proprietario, p.nome as proprietario_nome
        from veiculos v
        join proprietarios p on v.proprietario = p.codigo
        order by v.codigo`);
        return rows.map((veiculo) => new Veiculo(veiculo.codigo, veiculo.modelo, veiculo.disponivel, veiculo.ano,
                veiculo.proprietario, veiculo.proprietario_nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}


const addVeiculoDB = async (body) => {
    try {   
        const { modelo, disponivel, ano, proprietario } = body; 
        const results = await pool.query(`INSERT INTO veiculos (modelo, disponivel, ano, proprietario) 
            VALUES ($1, $2, $3, $4)
            returning codigo, modelo, disponivel, ano, proprietario`,
        [modelo, disponivel, ano, proprietario]);
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.codigo, veiculo.modelo, veiculo.disponivel, veiculo.ano, veiculo.proprietario, "");
    } catch (err) {
        throw "Erro ao inserir o veiculo: " + err;
    }    
}

const updateVeiculoDB = async (body) => {
    try {   
        const { codigo, modelo, disponivel, ano, proprietario }  = body; 
        const results = await pool.query(`UPDATE veiculos set modelo = $2 , disponivel = $3, ano = $4, 
        proprietario = $5 where codigo = $1 
        returning codigo, modelo, disponivel, ano, proprietario`,
        [codigo, modelo, disponivel, ano, proprietario]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const veiculo = results.rows[0];
        return new Veiculo(veiculo.codigo, veiculo.modelo, veiculo.disponivel, veiculo.ano, veiculo.proprietario, "");
    } catch (err) {
        throw "Erro ao alterar o Veículo: " + err;
    }      
}

const deleteVeiculoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM veiculos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Veículo removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o veículo: " + err;
    }     
}

const getVeiculoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select v.codigo as codigo, v.modelo as modelo, v.disponivel as disponivel, v.ano as ano, 
         v.proprietario as proprietario, p.nome as proprietario_nome
        from veiculos v
        join proprietarios p on v.proprietario = p.codigo where v.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const veiculo = results.rows[0];
            return new Veiculo(veiculo.codigo, veiculo.modelo, veiculo.disponivel, veiculo.ano, 
                veiculo.proprietario, veiculo.proprietario_nome, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar o veiculo: " + err;
    }     
}







module.exports = {
    getVeiculosDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoPorCodigoDB
}