import express from 'express';
const app = express();
app.use(express.json())

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

app.get('/', (_req, res) => {
    console.log('hola');
    res.send('hello world');
})
