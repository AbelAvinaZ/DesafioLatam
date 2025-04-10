import express from 'express';
import { obtenerJugadores, registrarJugador, } from './controllers/jugadores.js';
import { obtenerEquipos, agregarEquipo } from './controllers/equipos.js';
import { login, verifyToken } from './controllers/authController.js';


export const app = express();
app.listen(3000, () => console.log("SERVER ON"));
app.use(express.json())


app.post("/login", login);

app.get("/equipos", obtenerEquipos)
app.post("/equipos", verifyToken, agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", verifyToken, registrarJugador)
