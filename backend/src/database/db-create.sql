CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
	password VARCHAR(255),
    email VARCHAR(255)
)

INSERT INTO users (name, password, email) VALUES ('Franco', '123456', 'franco@gmail.com')

CREATE TABLE Prestadores (
    id INT PRIMARY KEY,
    userId INT,
    prestador VARCHAR(255),
    localidad VARCHAR(255),
    tipo VARCHAR(255)
);

CREATE TABLE Notas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prestadorId INT,
    nota VARCHAR(255),
    FOREIGN KEY (prestadorId) REFERENCES Prestadores(id)
);

CREATE TABLE Years (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prestadorId INT,
    year INT,
    FOREIGN KEY (prestadorId) REFERENCES Prestadores(id)
);

CREATE TABLE Meses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    yearId INT,
    mes VARCHAR(3),
    valor INT,
    FOREIGN KEY (yearId) REFERENCES Years(id)
);


-- CREATE TABLE Usuarios (
--     UsuarioID INT PRIMARY KEY,
--     Nombre VARCHAR(50),
--     -- Otros campos relevantes de usuario
-- );
-- CREATE TABLE DatosExcel (
--     ID INT PRIMARY KEY,
--     UsuarioID INT,
--     Datos VARCHAR(255),
--     -- Otros campos relevantes para los datos de Excel
--     FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
-- );
