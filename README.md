Perfeito 👍. Pela estrutura que você mostrou, ajustei o **README para refletir exatamente a arquitetura do seu projeto (DAO + Service + Controller)** e os diretórios corretos.

Você pode colocar **direto no `README.md`** do repositório.

---

# API de Produtos, Categorias e Usuários

## 📚 Descrição do Domínio

Esta API REST foi desenvolvida para realizar o **gerenciamento de produtos e categorias**, permitindo também o controle de **usuários autenticados** que acessam o sistema.

O sistema simula um **controle de estoque ou catálogo de produtos**, onde os itens são organizados em categorias e manipulados por usuários cadastrados.

---

# 🎯 Funcionalidades da API

A API permite:

* Criar e listar **categorias de produtos**
* Criar e gerenciar **produtos**
* Controlar **quantidade em estoque**
* Registrar **usuários**
* Realizar **autenticação via JWT**
* Consultar **produtos de uma categoria**

---

# 🔗 Relacionamento entre Entidades

O sistema possui um relacionamento **1:N entre categorias e produtos**.

```
Categorias (1) ─────────── (N) Produtos
```

Isso significa que:

* Uma **categoria pode possuir vários produtos**
* Um **produto pertence a apenas uma categoria**

---

# ⚙️ Tecnologias Utilizadas

* **Node.js**
* **Express**
* **PostgreSQL**
* **Sequelize**
* **JWT (JSON Web Token)**
* **Swagger (Documentação da API)**

---

# ⚙️ Instalação e Execução

## Pré-requisitos

Certifique-se de possuir instalado:

* Node.js (v14 ou superior)
* npm ou yarn
* PostgreSQL

---

# 1️⃣ Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd API_PRODUTOS_CATEGORIAS
```

---

# 2️⃣ Instalar Dependências

```bash
npm install
```

---

# 3️⃣ Criar Banco de Dados

Acesse o PostgreSQL:

```bash
psql -U postgres
```

Crie o banco:

```sql
CREATE DATABASE trabalho_sw;
```

---

# 4️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto.

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=trabalho_sw

JWT_SECRET=123456
```

---

# 🚀 Executar o Projeto

```bash
npm start
```

Servidor iniciará em:

```
http://localhost:3000
```

---

# 📖 Documentação Swagger

A documentação interativa da API pode ser acessada em:

```
http://localhost:3000/api-docs
```

Nela é possível:

* visualizar todos os endpoints
* testar requisições
* enviar token JWT
* visualizar parâmetros e respostas

---

# 📋 Rotas da API

## 🔐 Autenticação

| Método | Rota           | Descrição        |
| ------ | -------------- | ---------------- |
| POST   | /auth/login    | Realiza login    |
| POST   | /auth/register | Registra usuário |

---

## 👤 Usuários

| Método | Rota      | Descrição       |
| ------ | --------- | --------------- |
| POST   | /usuarios | Criar usuário   |
| GET    | /usuarios | Listar usuários |

---

## 📦 Produtos

| Método | Rota           | Descrição             |
| ------ | -------------- | --------------------- |
| POST   | /produtos      | Criar produto         |
| GET    | /produtos      | Listar produtos       |
| GET    | /produtos/{id} | Buscar produto por ID |
| PUT    | /produtos/{id} | Atualizar produto     |
| DELETE | /produtos/{id} | Remover produto       |

---

## 🗂️ Categorias

| Método | Rota                      | Descrição                    |
| ------ | ------------------------- | ---------------------------- |
| POST   | /categorias               | Criar categoria              |
| GET    | /categorias               | Listar categorias            |
| GET    | /categorias/{id}/produtos | Listar produtos da categoria |

---

# 🗂️ Estrutura do Projeto

```
API_PRODUTOS_CATEGORIAS
│
├── src
│
│   ├── config
│   │   └── database.js
│
│   ├── controllers
│   │   ├── authController.js
│   │   ├── categoriaController.js
│   │   ├── produtoController.js
│   │   └── usuarioController.js
│
│   ├── dao
│   │   ├── categoriaDAO.js
│   │   └── produtoDAO.js
│
│   ├── services
│   │   ├── categoriaService.js
│   │   └── produtoService.js
│
│   ├── models
│   │   ├── categoria.js
│   │   ├── produto.js
│   │   ├── usuario.js
│   │   └── index.js
│
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── categoriaRoutes.js
│   │   ├── produtoRoutes.js
│   │   └── usuarioRoutes.js
│
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│
│   ├── docs
│   │   └── swagger.js
│
│   └── app.js
│
├── server.js
├── package.json
├── api-docs.js
├── .env
└── README.md
```

---

# 📊 Modelo de Dados

## Tabela: categorias

| Coluna    | Tipo         | Descrição                  |
| --------- | ------------ | -------------------------- |
| id        | SERIAL       | Identificador da categoria |
| nome      | VARCHAR(100) | Nome da categoria          |
| descricao | TEXT         | Descrição da categoria     |

---

## Tabela: produtos

| Coluna             | Tipo          | Descrição                        |
| ------------------ | ------------- | -------------------------------- |
| id                 | SERIAL        | Identificador do produto         |
| nome               | VARCHAR(100)  | Nome do produto                  |
| preco              | DECIMAL(10,2) | Preço                            |
| quantidade_estoque | INTEGER       | Quantidade em estoque            |
| categoria_id       | INTEGER       | Chave estrangeira para categoria |

---

## Tabela: usuarios

| Coluna    | Tipo         | Descrição                |
| --------- | ------------ | ------------------------ |
| id        | SERIAL       | Identificador do usuário |
| nome      | VARCHAR(255) | Nome                     |
| email     | VARCHAR(255) | Email único              |
| senha     | VARCHAR(255) | Senha criptografada      |
| createdAt | TIMESTAMP    | Data de criação          |
| updatedAt | TIMESTAMP    | Data de atualização      |

---

# 🔒 Segurança

A API utiliza **JWT (JSON Web Token)** para autenticação.

Após realizar login, o usuário recebe um token que deve ser enviado no header das requisições protegidas.

```
Authorization: Bearer <seu_token>
```

---

✅ Se quiser, eu também posso te entregar uma **versão ainda melhor para GitHub**, incluindo:

* **diagrama do banco de dados**
* **exemplos de JSON de requisição/resposta**
* **badges (Node, Express, PostgreSQL, Swagger)**
* **passo a passo de teste no Postman**

Isso deixa seu README **nível projeto profissional de portfólio**.
