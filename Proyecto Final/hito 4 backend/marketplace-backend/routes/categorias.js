import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Crear categoría (protegida)
router.post("/", authMiddleware, async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).send("El nombre de la categoría es obligatorio");
    }
    try {
        const result = await pool.query(
            "INSERT INTO Categorias (nombre) VALUES ($1) RETURNING *",
            [nombre]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(400).send("Error al crear categoría");
    }
});

// Listar categorías (pública)
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Categorias");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;