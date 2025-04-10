import jwt from 'jsonwebtoken';
import secretKey from '../utils.js';


export const login = (req, res) => {
    const { username, password } = req.body;

    // Credenciales hardcodeadas según el desafío
    if (username === 'admin' && password === '1234') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(400).json({ message: 'Credenciales incorrectas' });
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};