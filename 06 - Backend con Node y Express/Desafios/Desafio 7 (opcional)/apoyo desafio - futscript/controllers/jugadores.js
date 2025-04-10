import { getPlayers, addPlayer } from '../db/consultas.js';

export const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params;
    const jugadores = await getPlayers(teamID);
    res.json(jugadores);
};

export const registrarJugador = async (req, res) => {
    const { teamID } = req.params;
    const jugador = req.body;

    try {
        await addPlayer({ jugador, teamID });
        res.status(201).json({ message: "Jugador agregado con éxito" });
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({
            message: "Error al agregar jugador",
            detail: error.message
        });
    }
};