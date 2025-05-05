const { pool } = require('../config');
const Locacao = require('../entities/locacao');



const getLocacoesDB = async () => {
    try {    
        const { rows } = await pool.query(`select l.codigo as codigo, to_char(l.data_retirada,'YYYY-MM-DD') as data_retirada, 
                            to_char(l.data_retorno,'YYYY-MM-DD') as data_retorno, l.veiculo as veiculo, v.modelo as veiculo_modelo
        from locacoes l
        join veiculos v on l.veiculo = v.codigo
        order by l.codigo`);
        return rows.map((locacao) => new Locacao(locacao.codigo, locacao.data_retirada, locacao.data_retorno, locacao.veiculo, locacao.veiculo_modelo));        
    } catch (err) {
        throw "Erro : " + err;
    }
}


const addLocacaoDB = async (body) => {
    try {   
        const { data_retirada, data_retorno, veiculo } = body; 
        const results = await pool.query(`INSERT INTO locacoes (data_retirada, data_retorno, veiculo) 
            VALUES ($1, $2, $3)
            returning codigo, to_char(data_retirada,'YYYY-MM-DD') as data_retirada, to_char(data_retorno,'YYYY-MM-DD') as data_retorno, veiculo`,
        [data_retirada, data_retorno, veiculo]);
        const locacao = results.rows[0];
        return new Locacao(locacao.codigo, locacao.data_retirada,locacao.data_retorno,locacao.veiculo, "");
    } catch (err) {
        throw "Erro ao inserir a locação: " + err;
    }    
}

const updateLocacaoDB = async (body) => {
    try {   
        const { codigo, data_retirada, data_retorno, veiculo }  = body; 
        const results = await pool.query(`UPDATE locacoes set data_retirada = $2 , data_retorno = $3, veiculo = $4
         where codigo = $1 
        returning codigo, to_char(data_retirada,'YYYY-MM-DD') as data_retirada, to_char(data_retorno,'YYYY-MM-DD') as data_retorno, veiculo`,
        [codigo, data_retirada, data_retorno, veiculo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const locacao = results.rows[0];
        return new Locacao(locacao.codigo, locacao.data_retirada, locacao.data_retorno, locacao.veiculo, "");
    } catch (err) {
        throw "Erro ao alterar a locação: " + err;
    }      
}


const deleteLocacaoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM locacoes where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Locação removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a Locação: " + err;
    }     
}

const getLocacaoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select l.codigo as codigo, to_char(l.data_retirada,'YYYY-MM-DD') as data_retirada, 
                            to_char(l.data_retorno,'YYYY-MM-DD') as data_retorno, l.veiculo as veiculo, v.modelo as veiculo_modelo
        from locacoes l
        join veiculos v on l.veiculo = v.codigo where l.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const locacao = results.rows[0];
             return new Locacao(locacao.codigo, locacao.data_retirada,locacao.data_retorno,locacao.veiculo, locacao.veiculo_modelo, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }     
}







module.exports = {
    getLocacoesDB, addLocacaoDB, updateLocacaoDB, deleteLocacaoDB, getLocacaoPorCodigoDB
}