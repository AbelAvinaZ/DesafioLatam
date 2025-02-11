-- 1. Crear una base de datos llamada desao-tuNombre-tuApellido-3digitos.
CREATE DATABASE desafio-abel-aviña-100;

-- 2. Ingresar a la base de datos creada.
\c desafio-abel-aviña-100

-- 3. Crear una tabla llamada clientes:
--      a. Con una columna llamada email de tipo varchar(50).
--      b. Una columna llamada nombre de tipo varchar sin limitación.
--      c. Una columna llamada teléfono de tipo varchar(16).
--      d. Un campo llamado empresa de tipo varchar(50).
--      e. Una columna de tipo smallint, para indicar la prioridad del cliente. Ahí se debe ingresar un valor entre 1 y 10, donde 10 es más prioritario.
CREATE TABLE clientes (
    email VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR NOT NULL, 
    telefono VARCHAR(16) NOT NULL, 
    empresa VARCHAR(50) NOT NULL, 
    prioridad SMALLINT NOT NULL
); 

-- 4. Ingresar 10 clientes distintos con distintas prioridades, el resto de los valores los
-- puedes inventar.
INSERT INTO clientes (email, nombre, telefono, empresa, prioridad) VALUES
('a@a.com', 'a', '11111111', 'aa', 1),
('b@b.com', 'b', '22222222', 'bb', 2),
('c@c.com', 'c', '33333333', 'cc', 3),
('d@d.com', 'd', '44444444', 'dd', 4),
('e@e.com', 'e', '55555555', 'ee', 5),
('f@f.com', 'f', '66666666', 'ff', 6),
('g@g.com', 'g', '77777777', 'gg', 7),
('h@h.com', 'h', '88888888', 'hh', 8),
('i@i.com', 'i', '99999999', 'ii', 9),
('j@j.com', 'j', '1010101010101010', 'jj', 10);


-- 5. Selecciona los tres clientes de mayor prioridad.
SELECT * FROM clientes ORDER BY prioridad DESC LIMIT 3;

-- 6. Selecciona todos los clientes cuya prioridad sea mayor a 5.
SELECT * FROM clientes WHERE prioridad >= 5;