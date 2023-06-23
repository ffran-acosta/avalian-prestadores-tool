    // updateUser: async (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;
    //         const { name, email } = req.body;
    //         const updatedUser: User = { id: parseInt(id), name, email };
    //         await localDb.none('UPDATE users SET name = $1, email = $2 WHERE id = $3', [updatedUser.name, updatedUser.email, updatedUser.id]);
    //         res.json(updatedUser);
    //     } catch (error) {
    //         console.error('Error updating user:', error);
    //         res.status(500).json({ error: 'Failed to update user' });
    //     }
    // },