CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
	password VARCHAR(255),
    email VARCHAR(255)
)

INSERT INTO users (name, password, email) VALUES ('Franco', '123456', 'franco@gmail.com')


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
