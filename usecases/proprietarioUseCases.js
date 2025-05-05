const { pool } = require('../config');
const Proprietario = require('../entities/proprietario');

const getProprietariosBD = async () => {
    try {
        const { rows }  = await pool.query('SELECT * FROM proprietarios ORDER BY codigo');
        return rows.map((proprietario) => new Proprietario(proprietario.codigo, proprietario.nome, proprietario.cpf, proprietario.rg, proprietario.email, proprietario.telefone));

    } catch (err) {
        throw "Erro: " + err;
    }
}

const addProprietarioDB = async (body) => {
    try {
        
        const {nome, cpf, rg, email, telefone} = body;
        const results = await pool.query(`INSERT into proprietarios (nome, cpf, rg, email, telefone) 
            VALUES ($1, $2, $3, $4, $5) returning codigo, nome, cpf`, [nome, cpf, rg, email, telefone]);

        const proprietario = results.rows[0];
        return new Proprietario(proprietario.codigo, proprietario.nome, proprietario.cpf); 

    } catch (err) {
        throw "Erro ao inserir o proprietario!" + err;
    }
}

const updateProprietarioDB = async (body) => {
    try {
        const { codigo, ...camposParaAtualizar } = body;

        if (!codigo) {
            throw "Código do proprietário não informado.";
        }

        const chaves = Object.keys(camposParaAtualizar);

        if (chaves.length === 0) {
            throw "Nenhum campo para atualizar.";
        }

        // Gera a parte "campo1 = $1, campo2 = $2, ..." dinamicamente
        const setClause = chaves.map((campo, index) => `${campo} = $${index + 1}`).join(", ");

        const valores = Object.values(camposParaAtualizar);

        // A posição do código vem depois dos campos a serem atualizados
        const query = `
            UPDATE proprietarios 
            SET ${setClause} 
            WHERE codigo = $${chaves.length + 1} 
            RETURNING *`;

        const results = await pool.query(query, [...valores, codigo]);

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado.`;
        }

        const p = results.rows[0];
        return new Proprietario(p.codigo, p.nome, p.cpf, p.rg, p.email, p.telefone);

    } catch (err) {
        throw "Erro ao alterar o Proprietário! " + err;
    }
};



const deleteProprietarioDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM proprietarios where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Proprietario removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o proprietario: " + err;
    }     
}

const getProprietarioPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM proprietarios where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const proprietario = results.rows[0];
            return new Proprietario(proprietario.codigo, proprietario.nome, proprietario.cpf, proprietario.rg, proprietario.email, proprietario.telefone); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o proprietario: " + err;
    }     
}


module.exports = {
    getProprietariosBD, addProprietarioDB, getProprietarioPorCodigoDB,
    deleteProprietarioDB, updateProprietarioDB
}