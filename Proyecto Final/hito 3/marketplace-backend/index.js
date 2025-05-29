// index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";
import publicacionesRouter from "./routes/publicaciones.js";
import errorHandler from "./middleware/error.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/usuarios", usuariosRouter);
app.use("/api", authRouter);
app.use("/api/publicaciones", publicacionesRouter);

app.get("/", (req, res) => {
    res.send("API Marketplace");
});

app.use(errorHandler);

// Solo iniciar el servidor si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

export default app;