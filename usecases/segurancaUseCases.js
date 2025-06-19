const { pool } = require('../config')
const Usuario = require('../entities/usuario')

const autenticaUsuarioDB = async (body) => {
    try {           
        const { email, senha } = body
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
        [email, senha]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou tenha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

const addUsuarioDB = async (body) => {
    try {
        
        const {email,senha, tipo, telefone, nome} = body;
        const results = await pool.query(`INSERT into usuarios (email, senha, tipo, telefone, nome) 
            VALUES ($1, $2, $3, $4, $5) returning email, nome`, [email,senha, tipo, telefone, nome]);

        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.nome); 

    } catch (err) {
        throw "Erro ao inserir o Usuário!" + err;
    }
}

const updateUsuarioDB = async (body) => {
    try {   
        const {email,senha, tipo, telefone, nome}  = body; 
        const results = await pool.query(`UPDATE usuarios set email = $1 ,senha = $2, tipo = $3, telefone = $4, 
       nome = $5 where email = $1 
        returning email,senha, tipo, telefone, nome`,
        [email, senha, tipo, telefone, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o email ${email} para ser alterado`;
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.nome, "");
    } catch (err) {
        throw "Erro ao alterar o Usuário: " + err;
    }      
}





module.exports = {
    autenticaUsuarioDB, addUsuarioDB, updateUsuarioDB
}