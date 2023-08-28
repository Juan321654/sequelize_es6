import express from 'express';
const app = express()
const port = 3005
app.use(express.json());
import db from './models/index.js';


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()   // <-- Use db.User directly
    res.send(users)
})

// Initialize the models and start the server
db.initModels().then(() => {  // <-- Initialize models first
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
