CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
	password VARCHAR(255),
    email VARCHAR(255)
)

INSERT INTO users (name, password, email) VALUES ('Franco', '123456', 'franco@gmail.com')

CREATE TABLE prestadores (
    id INT PRIMARY KEY,
    user_id INTEGER REFERENCES users (id) NOT NULL,
    prestador VARCHAR(255) NOT NULL,
    localidad VARCHAR(255),
    tipo VARCHAR(255),
    notas TEXT[] DEFAULT ARRAY[]::TEXT[],
    years JSONB[] DEFAULT ARRAY[]::JSONB[]
);

INSERT INTO prestadores (id, user_id, prestador, localidad, tipo, notas, years)
VALUES
    (1, 1, 'Nombre del prestador 1', 'Nombre de la localidad', 'Tipo de prestador',
    ARRAY['Nota 1 asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
            'Nota 2 asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
            'Nota 3 asdassdasd'],
    ARRAY[
        '{"year": 2022, "meses": [{"mes": "ENE", "valor": 4}, {"mes": "FEB", "valor": 7}, {"mes": "MAR", "valor": 2}, {"mes": "ABR", "valor": 9}, {"mes": "MAY", "valor": 2}, {"mes": "JUN", "valor": 6}, {"mes": "JUL", "valor": 8}, {"mes": "AGO", "valor": 4}, {"mes": "SEP", "valor": 1}, {"mes": "OCT", "valor": 6}, {"mes": "NOV", "valor": 3}, {"mes": "DIC", "valor": 9}]}',
        '{"year": 2023, "meses": [{"mes": "ENE", "valor": 4}, {"mes": "FEB", "valor": 6}, {"mes": "MAR", "valor": 2}, {"mes": "ABR", "valor": 8}, {"mes": "MAY", "valor": 3}, {"mes": "JUN", "valor": 7}, {"mes": "JUL", "valor": 5}, {"mes": "AGO", "valor": 9}, {"mes": "SEP", "valor": 1}, {"mes": "OCT", "valor": 5}, {"mes": "NOV", "valor": 2}, {"mes": "DIC", "valor": 7}]}'
    ]::JSONB[]
);

INSERT INTO prestadores (id, user_id, prestador, localidad, tipo, notas, years)
VALUES
    (321, 13, 'Nombre del prestador 123', 'Nombre de la localidad 123', 'Tipo de prestador 123',
    ARRAY['Nota 1 asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
            'Nota 2 asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
            'Nota 3 asdassdasd'],
    ARRAY[
        '{"year": 2022, "meses": [{"mes": "ENE", "valor": 4}, {"mes": "FEB", "valor": 7}, {"mes": "MAR", "valor": 2}, {"mes": "ABR", "valor": 9}, {"mes": "MAY", "valor": 2}, {"mes": "JUN", "valor": 6}, {"mes": "JUL", "valor": 8}, {"mes": "AGO", "valor": 4}, {"mes": "SEP", "valor": 1}, {"mes": "OCT", "valor": 6}, {"mes": "NOV", "valor": 3}, {"mes": "DIC", "valor": 9}]}',
        '{"year": 2023, "meses": [{"mes": "ENE", "valor": 4}, {"mes": "FEB", "valor": 6}, {"mes": "MAR", "valor": 2}, {"mes": "ABR", "valor": 8}, {"mes": "MAY", "valor": 3}, {"mes": "JUN", "valor": 7}, {"mes": "JUL", "valor": 5}, {"mes": "AGO", "valor": 9}, {"mes": "SEP", "valor": 1}, {"mes": "OCT", "valor": 5}, {"mes": "NOV", "valor": 2}, {"mes": "DIC", "valor": 7}]}'
    ]::JSONB[]
);

CREATE TABLE ref_values (
    mes VARCHAR(3) PRIMARY KEY,
    valor INT
);

INSERT INTO ref_values (mes, valor)
VALUES 
    ('ENE', 0),
    ('FEB', 0),
    ('MAR', 0),
    ('ABR', 0),
    ('MAY', 0),
    ('JUN', 0),
    ('JUL', 0),
    ('AGO', 0),
    ('SEP', 0),
    ('OCT', 0),
    ('NOV', 0),
    ('DIC', 0);