const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // 1. Testea que GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto
    it("GET /cafes devuelve status 200 y un arreglo con al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("nombre");
    });

    // 2. Testea que DELETE /cafes/:id devuelve 404 para un ID inexistente
    it("DELETE /cafes/:id devuelve 404 si el ID no existe", async () => {
        const response = await request(server)
            .delete("/cafes/999") // ID que no existe
            .set("Authorization", "token123"); // Se requiere un token en el header
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            message: "No se encontró ningún cafe con ese id",
        });
    });

    // 3. Testea que POST /cafes agrega un café y devuelve 201
    it("POST /cafes agrega un nuevo café y devuelve status 201", async () => {
        const newCafe = { id: 5, nombre: "Latte" };
        const response = await request(server)
            .post("/cafes")
            .send(newCafe);
        expect(response.status).toBe(201);
        expect(response.body).toContainEqual(newCafe); // Verifica que el café esté en la lista
    });

    // 4. Testea que PUT /cafes/:id devuelve 400 si los IDs no coinciden
    it("PUT /cafes/:id devuelve 400 si el ID del parámetro no coincide con el del payload", async () => {
        const updatedCafe = { id: 1, nombre: "Cortado Modificado" };
        const response = await request(server)
            .put("/cafes/2") // ID diferente al del payload
            .send(updatedCafe);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "El id del parámetro no coincide con el id del café recibido",
        });
    });
});