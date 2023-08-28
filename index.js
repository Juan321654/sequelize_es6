import express from 'express';
import db from './models/index.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3005;

app.use(express.json());
app.use(userRoutes);

app.get('/', (req, res) => res.send('Hello World!'))

// Initialize the models and start the server
db.initModels().then(() => {  // <-- Initialize models first
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
