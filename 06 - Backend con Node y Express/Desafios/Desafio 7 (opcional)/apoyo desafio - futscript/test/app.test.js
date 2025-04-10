import request from 'supertest';
import { app } from "../index.js";
import jwt from 'jsonwebtoken';
import secretKey from '../utils.js';

describe('API FutScript', () => {
    describe('GET /equipos', () => {
        it('debería retornar un array y status 200', async () => {
            const response = await request(app).get('/equipos');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /login', () => {
        it('debería retornar un token con credenciales correctas', async () => {
            const response = await request(app)
                .post('/login')
                .send({ username: 'admin', password: '1234' });

            expect(response.statusCode).toBe(200);
            expect(typeof response.body.token).toBe('string');
        });

        it('debería retornar 400 con credenciales incorrectas', async () => {
            const response = await request(app)
                .post('/login')
                .send({ username: 'wrong', password: 'wrong' });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('POST /equipos/:teamID/jugadores', () => {
        it('debería retornar 201 con token válido', async () => {
            const token = jwt.sign({ username: 'admin' }, secretKey, { expiresIn: '1h' });

            // crear equipo
            const teamResponse = await request(app)
                .post('/equipos')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Equipo de Prueba' });


            expect(teamResponse.statusCode).toBe(201);
            expect(teamResponse.body).toHaveProperty('id');

            const teamID = teamResponse.body.id;

            // agregar jugador
            const playerData = {
                name: 'Jugador de Prueba',
                position: 1
            };

            const response = await request(app)
                .post(`/equipos/${teamID}/jugadores`)
                .set('Authorization', `Bearer ${token}`)
                .send(playerData);

            expect(response.statusCode).toBe(201);
        }, 10000);
    });
});