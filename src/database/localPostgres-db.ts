import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();
const pgp = pgPromise();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const db = pgp(connectionString);

export default db;