// import express from 'express';
// import bodyParser from 'body-parser';

// const app = express();
// const port = 3000;

// // Parse incoming JSON data
// app.use(bodyParser.json());

// // User data
// let users: { id: number, name: string, email: string }[] = [
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
// ];

// // Get all users
// app.get('/users', (req, res) => {
//     res.json(users);
// });

// // Get a single user by ID
// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(u => u.id === id);

//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// });

// // Create a new user
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     users.push(newUser);
//     res.json(newUser);
// });

// // Update a user
// app.put('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const updatedUser = req.body;
//     const index = users.findIndex(u => u.id === id);

//     if (index !== -1) {
//         users[index] = { ...users[index], ...updatedUser };
//         res.json(users[index]);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// });

// // Delete a user
// app.delete('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = users.findIndex(u => u.id === id);

//     if (index !== -1) {
//         const deletedUser = users.splice(index, 1)[0];
//         res.json(deletedUser);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });