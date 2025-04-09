import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './database/db.js';
import cors from "cors";
import "dotenv/config";
import { checkCredentials, verifyToken } from './middlewares/middlewares.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuarios (email, password, rol, language) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [email, hashedPassword, rol, lenguage];
        const { rows } = await pool.query(query, values);
        res.status(201).json({ message: 'Usuario registrado', usuario: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

app.post('/login', checkCredentials, async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        if (rows.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password); // Comparar contraseña
        if (!isValid) return res.status(401).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


// Obtener datos del usuario autenticado
app.get('/usuarios', verifyToken, async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extraer token de "Bearer <token>"
        if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verificar token
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [decoded.email]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(rows); // Devuelve un array como espera el frontend
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token inválido' });
    }
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});