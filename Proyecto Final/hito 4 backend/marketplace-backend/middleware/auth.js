import jwt from "jsonwebtoken";
import { secretKey } from "../secretKey.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Acceso denegado: Formato de token inválido");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Token inválido");
    }
};

export default authMiddleware;