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
import { indexRoute } from './routes';
app.use(indexRoute)

import { userRoute } from './routes';
app.use('/users', userRoute)

