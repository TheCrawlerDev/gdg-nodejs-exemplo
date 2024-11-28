const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// "Banco de dados" em memória
let usuarios = [];
let idCounter = 1;

// Rotas CRUD

// 1. Criar um usuário
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });
  }
  const novoUsuario = { id: idCounter++, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// 2. Listar todos os usuários
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// 3. Obter um usuário por ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((u) => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." });
  }
  res.json(usuario);
});

// 4. Atualizar um usuário por ID
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const usuario = usuarios.find((u) => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." });
  }

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.json(usuario);
});

// 5. Deletar um usuário por ID
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex((u) => u.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado." });
  }

  usuarios.splice(index, 1);
  res.status(204).send();
});

// Iniciar o servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
