import { pool } from '../database/connection.js';

const generarHATEOAS = (joyas) => {
    return joyas.map((j) => {
        return {
            name: j.nombre,
            href: `/joyas/joya/${j.id}`,
        };
    });
};

export const getJoyas = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;

        const [campo, direccion] = order_by.split('_');
        const offset = (page - 1) * limits;

        const query = `SELECT * FROM inventario ORDER BY ${campo} ${direccion} LIMIT $1 OFFSET $2`;
        const values = [limits, offset];

        const { rows } = await pool.query(query, values);

        res.json({
            total: rows.length,
            results: generarHATEOAS(rows),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las joyas', detail: error.message });
    }
};

export const getJoyasFiltradas = async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query;

        const condiciones = [];
        const valores = [];
        let index = 1;

        if (precio_min) {
            condiciones.push(`precio >= $${index++}`);
            valores.push(precio_min);
        }
        if (precio_max) {
            condiciones.push(`precio <= $${index++}`);
            valores.push(precio_max);
        }
        if (categoria) {
            condiciones.push(`categoria = $${index++}`);
            valores.push(categoria);
        }
        if (metal) {
            condiciones.push(`metal = $${index++}`);
            valores.push(metal);
        }

        const where = condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : '';
        const query = `SELECT * FROM inventario ${where}`;
        const { rows } = await pool.query(query, valores);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar las joyas', detail: error.message });
    }
};
