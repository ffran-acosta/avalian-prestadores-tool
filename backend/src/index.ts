import express from 'express';
import cors from 'cors';

import { port, start } from './modules';
import { indexRoutes, userRoutes, prestadoresRoutes } from './routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Routes
app.use(indexRoutes);
app.use('/users', userRoutes);
app.use('/api/prestadores', prestadoresRoutes);

// Server
app.listen(port, start);