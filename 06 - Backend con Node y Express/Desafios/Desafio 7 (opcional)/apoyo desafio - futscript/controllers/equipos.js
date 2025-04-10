import { getTeams, addTeam } from '../db/consultas.js';

export const obtenerEquipos = async (req, res) => {
    const equipos = await getTeams();
    res.json(equipos);
};

export const agregarEquipo = async (req, res) => {
    const equipo = req.body;
    try {
        const nuevoEquipo = await addTeam(equipo);
        res.status(201).json(nuevoEquipo); // Debe incluir el ID
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar equipo" });
    }
};