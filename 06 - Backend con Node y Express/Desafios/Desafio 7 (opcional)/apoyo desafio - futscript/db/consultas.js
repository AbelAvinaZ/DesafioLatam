import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    allowExitOnIdle: true,
});

export const getTeams = async () => {
    const { rows } = await pool.query("SELECT id, name FROM equipos");
    return rows;
};

export const getPlayers = async (teamID) => {
    const query = `
        SELECT j.name, p.name as posicion 
        FROM jugadores j
        INNER JOIN posiciones p ON j.position = p.id
        WHERE j.id_equipo = $1
    `;
    const { rows } = await pool.query(query, [teamID]);
    return rows;
};

export const addTeam = async (equipo) => {
    const query = "INSERT INTO equipos(name) VALUES($1) RETURNING *";
    const { rows } = await pool.query(query, [equipo.name]);
    return rows[0];
};

export const addPlayer = async ({ jugador, teamID }) => {
    const query = `
        INSERT INTO jugadores(name, id_equipo, position) 
        VALUES($1, $2, $3) 
        RETURNING *
    `;
    
    if (!jugador.name || !teamID || !jugador.position) {
        throw new Error("Faltan campos requeridos");
    }
    
    const { rows } = await pool.query(query, [
        jugador.name, 
        teamID, 
        jugador.position
    ]);
    
    return rows[0];
};