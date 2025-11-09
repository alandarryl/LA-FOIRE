const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connectDB = require('./database/database');

app.use(express.json());

//importer les routes
const userRoutes = require('./router/user.routes');
const articleRoutes = require('./router/article.routes');


// utiliser les routes
app.use('/api', userRoutes);
app.use('/api', articleRoutes);

// connection a la base de données
connectDB();



const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

