CREATE TABLE testing_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
	number INT
)
INSERT INTO testing_table (name, number) VALUES ('prueba', 1)