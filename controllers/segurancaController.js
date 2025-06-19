const { autenticaUsuarioDB, addUsuarioDB, updateUsuarioDB } = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const { pool } = require('../config')

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 300 //expira em 5 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
        console.log("Usuario: " + JSON.stringify(decoded.usuario));
        request.usuario = decoded.usuario;
        next();
    });
}

const addUsuario = async (request, response) => {
    await addUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Usuário criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getMeuUsuario = async (request, response) => {
  try {
    const usuarioEmail = request.usuario.email;  // pega o email do token

    const query = `SELECT email, tipo, telefone, nome FROM usuarios WHERE email = $1`;
    const { rows } = await pool.query(query, [usuarioEmail]);

    if (rows.length === 0) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }

    return response.json({ status: "ok", usuario: rows[0] });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
};

const updateMeuUsuario = async (request, response) => {
  try {
    const emailOriginal = request.usuario.email;
    const { email, tipo, telefone, nome, senha } = request.body;

    if (!email || !tipo || !telefone || !nome) {
      return response.status(400).json({ status: "error", message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    let query = '';
    let params = [];

    if (senha && senha.trim() !== "") {
      query = `
        UPDATE usuarios
        SET email = $1,
            tipo = $2,
            telefone = $3,
            nome = $4,
            senha = $5
        WHERE email = $6
      `;
      params = [email, tipo, telefone, nome, senha, emailOriginal];
    } else {
      query = `
        UPDATE usuarios
        SET email = $1,
            tipo = $2,
            telefone = $3,
            nome = $4
        WHERE email = $5
      `;
      params = [email, tipo, telefone, nome, emailOriginal];
    }

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return response.status(404).json({ status: "error", message: "Usuário não encontrado." });
    }

    return response.json({ status: "ok", message: "Perfil atualizado com sucesso." });

  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    return response.status(500).json({ status: "error", message: err.message });
  }
};





module.exports = {
    login, verificaJWT, addUsuario, getMeuUsuario, updateMeuUsuario
}