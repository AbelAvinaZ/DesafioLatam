CREATE TABLE Usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  direccion VARCHAR(255)
);

CREATE TABLE Categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Publicaciones (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  imagen VARCHAR(255),
  usuario_id INTEGER REFERENCES Usuarios(id),
  categoria_id INTEGER REFERENCES Categorias(id)
);

-- Insertar datos de prueba
INSERT INTO Categorias (nombre) VALUES ('Electrónica'), ('Ropa');
INSERT INTO Usuarios (nombre, email, contrasena, direccion) 
VALUES ('Usuario Ejemplo', 'test@example.com', '123', 'Calle 123');