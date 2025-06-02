import request from "supertest";
import app from "../index.js";
import pool from "../config/db.js";

describe("API Marketplace", () => {
    let server;

    beforeAll(async () => {
        // Iniciar el servidor para supertest
        server = app.listen(0); // Puerto dinámico para pruebas
    });

    afterAll(async () => {
        // Cerrar el servidor y la conexión a la base de datos
        await new Promise(resolve => server.close(resolve));
        await pool.end();
    });

    // Test 1: Registro exitoso
    test("POST /api/usuarios debería registrar un usuario", async () => {
        const uniqueEmail = `test${Date.now()}@example.com`;
        const response = await request(app).post("/api/usuarios").send({
            nombre: "Test User",
            email: uniqueEmail,
            contrasena: "password123",
            direccion: "Calle 123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre", "Test User");
    });

    // Test 2: Login exitoso
    test("POST /api/login debería devolver un token", async () => {
        const uniqueEmail = `login${Date.now()}@example.com`;
        await request(app).post("/api/usuarios").send({
            nombre: "Test Login",
            email: uniqueEmail,
            contrasena: "password123",
            direccion: "Calle 456",
        });
        const response = await request(app).post("/api/login").send({
            email: uniqueEmail,
            contrasena: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    // Test 3: Acceso a perfil con token válido
    test("GET /api/usuarios/:id debería devolver el perfil con token válido", async () => {
        const uniqueEmail = `profile${Date.now()}@example.com`;
        const user = await request(app).post("/api/usuarios").send({
            nombre: "Test Profile",
            email: uniqueEmail,
            contrasena: "password123",
            direccion: "Calle 789",
        });
        const login = await request(app).post("/api/login").send({
            email: uniqueEmail,
            contrasena: "password123",
        });
        const response = await request(app)
            .get(`/api/usuarios/${user.body.id}`)
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("nombre", "Test Profile");
    });

    // Test 4: Acceso a publicaciones sin token
    test("GET /api/publicaciones debería devolver publicaciones sin token", async () => {
        const response = await request(app).get("/api/publicaciones");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test 5: Login con credenciales incorrectas
    test("POST /api/login debería fallar con credenciales incorrectas", async () => {
        const response = await request(app).post("/api/login").send({
            email: "noexiste@example.com",
            contrasena: "incorrecta",
        });
        expect(response.status).toBe(401);
        expect(response.text).toBe("Credenciales inválidas"); 
    });
});