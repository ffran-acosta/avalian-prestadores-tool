// EXPRESS
import express from 'express';
const app = express();
app.use(express.json())

// SERVER HOST
import { port, start } from './modules';
app.listen(port, start)

// ROUTES 
import { indexRoute } from './routes';
app.use(indexRoute)

import { dbRoute } from './routes';
app.use(dbRoute)
