import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";
import publicacionesRouter from "./routes/publicaciones.js";
import categoriasRouter from "./routes/categorias.js"
import errorHandler from "./middleware/error.js";

dotenv.config();
const app = express();

// Permitir múltiples orígenes para desarrollo y producción
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL || "https://mi-marketplace.netlify.app", // Actualiza con tu URL de Netlify
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Origen no permitido por CORS"));
            }
        },
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/usuarios", usuariosRouter);
app.use("/api", authRouter);
app.use("/api/publicaciones", publicacionesRouter);
app.use("/api/categorias", categoriasRouter);

app.get("/", (req, res) => {
    res.send("API Marketplace");
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

export default app;