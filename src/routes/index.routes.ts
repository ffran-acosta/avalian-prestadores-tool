import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world! Backend WORKS');
});

export default router;


// router.get('/', (req, res) => {
//     res.send('Get all users');
// });

// router.post('/', (req, res) => {
//     res.send('Create a user');
// });

// router.get('/:id', (req, res) => {
//     res.send(`Get user ${req.params.id}`);
// });

// router.put('/:id', (req, res) => {
//     res.send(`Update user ${req.params.id}`);
// });

// router.delete('/:id', (req, res) => {
//     res.send(`Delete user ${req.params.id}`);
// });

