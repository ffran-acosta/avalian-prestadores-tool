// EXPRESS
import express from 'express';

const app = express();
app.use(express.json())

import cors from 'cors'
app.use(cors({
    origin: 'http://localhost:5173'
}))

// SERVER HOST
import { port, start } from './modules';
app.listen(port, start)

// ROUTES 
import { indexRoutes } from './routes';
app.use(indexRoutes)

import { userRoutes } from './routes';
app.use('/users', userRoutes)

import { prestadoresRoutes } from './routes';
app.use('/api/prestadores', prestadoresRoutes)
