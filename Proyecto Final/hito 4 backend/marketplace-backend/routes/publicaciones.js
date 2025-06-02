import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Crear publicación
router.post("/", authMiddleware, async (req, res) => {
    const { titulo, descripcion, precio, imagen, categoria_id } = req.body;
    const usuario_id = req.user.id;
    if (!titulo || !precio || !categoria_id) {
        return res.status(400).send("Faltan campos obligatorios");
    }
    try {
        // Verificar que la categoría exista
        const categoriaExists = await pool.query("SELECT * FROM Categorias WHERE id = $1", [categoria_id]);
        if (categoriaExists.rows.length === 0) {
            return res.status(400).send("La categoría no existe");
        }
        const result = await pool.query(
            "INSERT INTO Publicaciones (titulo, descripcion, precio, imagen, usuario_id, categoria_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [titulo, descripcion, precio, imagen, usuario_id, categoria_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear publicación:", error);
        res.status(400).send("Error al crear publicación");
    }
});

// Obtener publicaciones
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Publicaciones");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Detalle de publicación
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Publicaciones WHERE id = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Publicación no encontrada");
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener publicación:", error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;