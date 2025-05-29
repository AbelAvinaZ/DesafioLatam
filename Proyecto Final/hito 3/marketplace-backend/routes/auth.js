import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../secretKey.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, contrasena } = req.body;
    if (!email || !contrasena) {
        return res.status(400).send("Faltan campos obligatorios");
    }
    try {
        const result = await pool.query("SELECT * FROM Usuarios WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
            return res.status(401).send("Credenciales inválidas"); // Asegúrate de que sea una cadena
        }
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
        res.json({ token, usuario: { id: user.id, nombre: user.nombre, email: user.email } });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error en el servidor");
    }
});

export default router;