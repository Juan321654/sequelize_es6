import express from 'express';
import db from '../models/index.js';
const router = express.Router();

router.get('/users', async (req, res) => {
     const users = await db.User.findAll()
     res.send(users)
})

export default router;