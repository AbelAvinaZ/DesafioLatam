import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Validar formato de email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Registro
router.post("/", async (req, res) => {
    const { nombre, email, contrasena, direccion } = req.body;
    if (!nombre || !email || !contrasena) {
        return res.status(400).send("Faltan campos obligatorios");
    }
    if (!isValidEmail(email)) {
        return res.status(400).send("Formato de email inválido");
    }
    try {
        const emailExists = await pool.query("SELECT * FROM Usuarios WHERE email = $1", [email]);
        if (emailExists.rows.length > 0) {
            return res.status(400).send("El email ya está registrado");
        }
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const result = await pool.query(
            "INSERT INTO Usuarios (nombre, email, contrasena, direccion) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email",
            [nombre, email, hashedPassword, direccion]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(400).send("Error al registrar usuario");
    }
});

// Perfil
router.get("/:id", authMiddleware, async (req, res) => {
    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).send("Acceso denegado");
    }
    try {
        const result = await pool.query("SELECT id, nombre, email, direccion FROM Usuarios WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;