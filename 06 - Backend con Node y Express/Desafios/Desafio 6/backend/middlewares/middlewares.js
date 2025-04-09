import jwt from 'jsonwebtoken';
import "dotenv/config";

// Middleware para verificar credenciales
const checkCredentials = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email y password son obligatorios' });
    next();
};

// Middleware para validar token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Guardar datos del token en req
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

// Middleware para log
const logRequests = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

export { checkCredentials, verifyToken, logRequests };