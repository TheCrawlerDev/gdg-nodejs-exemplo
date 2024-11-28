CRUD de Usuários com Node.js e Express

Este é um exemplo simples de um CRUD de usuários usando Node.js e Express.
Pré-requisitos

    Node.js
    npm

Testar o CRUD
Inicie o servidor:

node index.js

Use ferramentas como Postman ou curl para testar as rotas:

- Criar usuário:

curl -X POST -H "Content-Type: application/json" -d '{"nome": "João", "email": "joao@example.com"}' http://localhost:3000/usuarios

- Listar usuários:

curl http://localhost:3000/usuarios

- Buscar usuário por ID:

curl http://localhost:3000/usuarios/1

- Atualizar usuário:

curl -X PUT -H "Content-Type: application/json" -d '{"nome": "João Silva"}' http://localhost:3000/usuarios/1

- Deletar usuário:

curl -X DELETE http://localhost:3000/usuarios/1

