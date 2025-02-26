-- 1. Revisa el tipo de relación y crea el modelo correspondiente. Respeta las claves primarias, foráneas y tipos de datos. (como es relacion N:N debemos hacer una tabla relacionada con las 2 existentes)
CREATE TABLE Peliculas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    anno INTEGER NOT NULL
);

CREATE TABLE Tags (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Peliculas_Tags (
    pelicula_id INTEGER REFERENCES Peliculas(id),
    tag_id INTEGER REFERENCES Tags(id),
    PRIMARY KEY (pelicula_id, tag_id)
);

-- 2. Inserta 5 películas y 5 tags; la primera película debe tener 3 tags asociados, la segunda película debe tener 2 tags asociados.
INSERT INTO Peliculas (nombre, anno) VALUES
('El Padrino', 1972),
('Titanic', 1997),
('Inception', 2010),
('Matrix', 1999),
('Avatar', 2009);

INSERT INTO Tags (nombre) VALUES
('Drama'),
('Acción'),
('Romance'),
('Ciencia Ficción'),
('Suspenso');

INSERT INTO Peliculas_Tags (pelicula_id, tag_id) VALUES
(1, 1), (1, 2), (1, 5);

INSERT INTO Peliculas_Tags (pelicula_id, tag_id) VALUES
(2, 3), (2, 1);

-- 3. Cuenta la cantidad de tags que tiene cada película. Si una película no tiene tags debe mostrar 0.
SELECT 
    p.nombre,
    COUNT(pt.tag_id) AS cantidad_tags
FROM Peliculas p
LEFT JOIN Peliculas_Tags pt ON p.id = pt.pelicula_id
GROUP BY p.id, p.nombre;

-- 4. Crea las tablas correspondientes respetando los nombres, tipos, claves primarias y foráneas y tipos de datos.
CREATE TABLE Preguntas (
    id SERIAL PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    respuesta_correcta VARCHAR NOT NULL
);

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Respuestas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    pregunta_id INTEGER NOT NULL,
    respuesta VARCHAR(255) NOT NULL,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    CONSTRAINT fk_pregunta FOREIGN KEY (pregunta_id) REFERENCES Preguntas(id)
);

-- 5. Agrega 5 usuarios y 5 preguntas. 
-- a. La primera pregunta debe estar respondida correctamente dos veces, por dos usuarios diferentes.
-- b. La segunda pregunta debe estar contestada correctamente solo por un usuario.
-- c. Las otras dos preguntas deben tener respuestas incorrectas.
-- Contestada correctamente significa que la respuesta indicada en la tabla respuestas es exactamente igual al texto indicado en la tabla de preguntas.
INSERT INTO Usuarios (nombre) VALUES
('Juan'),
('María'),
('Pedro'),
('Ana'),
('Luis');

INSERT INTO Preguntas (pregunta, respuesta_correcta) VALUES
('¿Cuál es la capital de Francia?', 'París'),
('¿Cuánto es 2 + 2?', '4'),
('¿Qué planeta es el más grande?', 'Júpiter'),
('¿En qué año llegó Colón a América?', '1492'),
('¿Qué es H2O?', 'Agua');

INSERT INTO Respuestas (usuario_id, pregunta_id, respuesta) VALUES
(1, 1, 'París'),
(2, 1, 'París');

INSERT INTO Respuestas (usuario_id, pregunta_id, respuesta) VALUES
(3, 2, '4');

INSERT INTO Respuestas (usuario_id, pregunta_id, respuesta) VALUES
(4, 3, 'Tierra');

INSERT INTO Respuestas (usuario_id, pregunta_id, respuesta) VALUES
(5, 4, '1500');

-- 6. Cuenta la cantidad de respuestas correctas totales por usuario (independiente de la pregunta).
SELECT 
    u.nombre,
    COUNT(CASE WHEN r.respuesta = p.respuesta_correcta THEN 1 END) AS respuestas_correctas
FROM Usuarios u
LEFT JOIN Respuestas r ON u.id = r.usuario_id
LEFT JOIN Preguntas p ON r.pregunta_id = p.id
GROUP BY u.id, u.nombre;

-- 7. Por cada pregunta, en la tabla preguntas, cuenta cuántos usuarios respondieron correctamente
SELECT 
    p.pregunta,
    COUNT(CASE WHEN r.respuesta = p.respuesta_correcta THEN 1 END) AS usuarios_correctos
FROM Preguntas p
LEFT JOIN Respuestas r ON p.id = r.pregunta_id
GROUP BY p.id, p.pregunta;

-- 8. Implementa un borrado en cascada de las respuestas al borrar un usuario. Prueba la implementación borrando el primer usuario.
ALTER TABLE Respuestas
DROP CONSTRAINT fk_usuario,
ADD CONSTRAINT fk_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES Usuarios(id)
    ON DELETE CASCADE;

DELETE FROM Usuarios WHERE id = 1;

-- 9. Crea una restricción que impida insertar usuarios menores de 18 años en la base de datos.
ALTER TABLE Usuarios
ADD COLUMN edad INTEGER,
ADD CONSTRAINT edad_minima CHECK (edad >= 18);

-- 10. Altera la tabla existente de usuarios agregando el campo email. Debe tener la restricción de ser único.
ALTER TABLE Usuarios
ADD COLUMN email VARCHAR(255) UNIQUE;