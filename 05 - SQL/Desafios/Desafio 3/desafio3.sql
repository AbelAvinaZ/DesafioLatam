-- creat database desafio3_abel_avina_100
CREATE DATABASE desafio3_abel_avina_100;

-- Crear tablas primer tabla con id serial, email, nombre, apellido, rol ---- segunda tabla articulos con id serial, titulo, contenido, fecha_creacion y fecha_actualizacion timestamp, destacado boolean y usuario_id bigint  ---- tercera tabla con id serial, contenido text, fecha_creacion timestamp, usuario_id y post_id bigint
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    nombre varchar(255) NOT NULL,
    apellido varchar(255) NOT NULL,
    rol varchar(255) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    destacado BOOLEAN NOT NULL DEFAULT FALSE,
    usuario_id BIGINT NOT NULL
);

-- cambiar tabla usuario_id para que reciba not null sin problema
ALTER TABLE posts ALTER COLUMN usuario_id DROP NOT NULL;

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usuario_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL
);

-- tabla usuarios:
--  ingresa 5 usuarios en la base de datos, debe haber al menos un usuario con el rol de administrador.
INSERT INTO usuarios (email, nombre, apellido, rol)
VALUES 
    ('admin@example.com', 'Admin', 'User', 'administrador'),  -- Usuario administrador
    ('user1@example.com', 'Juan', 'Pérez', 'usuario'),        -- Usuario normal
    ('user2@example.com', 'María', 'Gómez', 'usuario'),       -- Usuario normal
    ('user3@example.com', 'Pedro', 'López', 'usuario'),       -- Usuario normal
    ('user4@example.com', 'Ana', 'Martínez', 'usuario');      -- Usuario normal

-- tabla articulos:
-- ingresa 5 posts:
-- ● El post con id 1 y 2 deben pertenecer al usuario administrador.
-- ● El post 3 y 4 asignarlos al usuario que prefieras (no puede ser el administrador).
-- ● El post 5 no debe tener un usuario_id asignado.
INSERT INTO posts (titulo, contenido, fecha_creacion, fecha_actualizacion, destacado, usuario_id)
VALUES 
    ('Post 1', 'Contenido del post 1', NOW(), NOW(), TRUE, 1),   -- Post 1 (usuario administrador)
    ('Post 2', 'Contenido del post 2', NOW(), NOW(), FALSE, 1),  -- Post 2 (usuario administrador)
    ('Post 3', 'Contenido del post 3', NOW(), NOW(), TRUE, 2),   -- Post 3 (usuario 2)
    ('Post 4', 'Contenido del post 4', NOW(), NOW(), FALSE, 2),  -- Post 4 (usuario 2)
    ('Post 5', 'Contenido del post 5', NOW(), NOW(), FALSE, NULL); -- Post 5 (sin usuario)

-- tabla comentarios:
-- ingresa 5 comentarios
-- ● Los comentarios con id 1,2 y 3 deben estar asociados al post 1, a los usuarios 1, 2 y 3 respectivamente.
-- ● Los comentarios 4 y 5 deben estar asociados al post 2, a los usuarios 1 y 2 respectivamente.
INSERT INTO comentarios (contenido, fecha_creacion, usuario_id, post_id)
VALUES 
    ('Comentario 1 en post 1', NOW(), 1, 1),  -- Comentario 1 (usuario 1 en post 1)
    ('Comentario 2 en post 1', NOW(), 2, 1),  -- Comentario 2 (usuario 2 en post 1)
    ('Comentario 3 en post 1', NOW(), 3, 1),  -- Comentario 3 (usuario 3 en post 1)
    ('Comentario 4 en post 2', NOW(), 1, 2),  -- Comentario 4 (usuario 1 en post 2)
    ('Comentario 5 en post 2', NOW(), 2, 2);  -- Comentario 5 (usuario 2 en post 2)

-- 2. Cruza los datos de la tabla usuarios y posts, mostrando las siguientes columnas: nombre y email del usuario junto al título y contenido del post.
SELECT u.nombre, u.email, p.titulo, p.contenido
FROM usuarios u
INNER JOIN posts p ON u.id = p.usuario_id;

-- 3. Muestra el id, título y contenido de los posts de los administradores.
-- a. El administrador puede ser cualquier id.
SELECT p.id, p.titulo, p.contenido
FROM posts p
JOIN usuarios u ON p.usuario_id = u.id
WHERE u.rol = 'administrador';

-- 4. Cuenta la cantidad de posts de cada usuario.
-- a. La tabla resultante debe mostrar el id e email del usuario junto con la cantidad de posts de cada usuario.
SELECT u.id, u.email, COUNT(p.id)
FROM usuarios u 
LEFT JOIN posts p ON p.usuario_id = u.id
GROUP BY u.id, u.email;

-- 5. Muestra el email del usuario que ha creado más posts.
-- a. Aquí la tabla resultante tiene un único registro y muestra solo el email.
SELECT u.email
FROM usuarios u
JOIN posts p ON u.id = p.usuario_id
GROUP BY u.email
ORDER BY COUNT(p.id) DESC
LIMIT 1;

-- 6. Muestra la fecha del último post de cada usuario.
SELECT u.nombre,
       MAX(p.fecha_creacion)
FROM usuarios u
LEFT JOIN posts p ON p.usuario_id = u.id
GROUP BY u.nombre;

-- 7. Muestra el título y contenido del post (artículo) con más comentarios.
SELECT p.titulo, p.contenido
FROM posts p
JOIN comentarios c ON p.id = c.post_id
GROUP BY p.id, p.titulo, p.contenido
ORDER BY COUNT(c.id) DESC
LIMIT 1;

-- 8. Muestra en una tabla el título de cada post, el contenido de cada post y el contenido de cada comentario asociado a los posts mostrados, junto con el email del usuario que lo escribió.
SELECT p.titulo, p.contenido, 
       c.contenido, u.email
FROM posts p
LEFT JOIN comentarios c ON p.id = c.post_id
LEFT JOIN usuarios u ON c.usuario_id = u.id;

-- 9. Muestra el contenido del último comentario de cada usuario.
SELECT DISTINCT ON (usuario_id) usuario_id, contenido, fecha_creacion
FROM comentarios
ORDER BY usuario_id, fecha_creacion DESC;

-- 10. Muestra los emails de los usuarios que no han escrito ningún comentario.
SELECT email
FROM usuarios
WHERE id NOT IN (SELECT usuario_id FROM comentarios);