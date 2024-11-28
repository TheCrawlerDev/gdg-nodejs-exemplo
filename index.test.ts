const request = require("supertest");
const express = require("express");

// Importa o código do servidor (ajuste o caminho conforme necessário)
const app = require("./index");

describe("Testes para o CRUD de usuários", () => {
  let idCriado;

  // Teste para criar um usuário
  it("Deve criar um novo usuário", async () => {
    const response = await request(app)
      .post("/usuarios")
      .send({ nome: "Teste", email: "teste@example.com" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Teste");
    expect(response.body.email).toBe("teste@example.com");

    idCriado = response.body.id; // Salva o ID para os próximos testes
  });

  // Teste para listar todos os usuários
  it("Deve listar todos os usuários", async () => {
    const response = await request(app).get("/usuarios");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Teste para buscar um usuário por ID
  it("Deve buscar um usuário pelo ID", async () => {
    const response = await request(app).get(`/usuarios/${idCriado}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", idCriado);
    expect(response.body.nome).toBe("Teste");
    expect(response.body.email).toBe("teste@example.com");
  });

  // Teste para atualizar um usuário
  it("Deve atualizar o usuário pelo ID", async () => {
    const response = await request(app)
      .put(`/usuarios/${idCriado}`)
      .send({ nome: "Teste Atualizado" });

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe("Teste Atualizado");
  });

  // Teste para deletar um usuário
  it("Deve deletar o usuário pelo ID", async () => {
    const response = await request(app).delete(`/usuarios/${idCriado}`);

    expect(response.statusCode).toBe(204);

    // Verifica se o usuário foi realmente deletado
    const getResponse = await request(app).get(`/usuarios/${idCriado}`);
    expect(getResponse.statusCode).toBe(404);
  });
});
