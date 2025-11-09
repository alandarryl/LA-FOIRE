const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config();

// const connectDB = require('./database/database');

app.use(express.json());

//importer les routes
const userRoutes = require('./router/user.routes');
const articleRoutes = require('./router/article.routes');
const avisRoutes = require('./router/avis.routes');

// fonction de connexion a la base de données
mongoose
    .connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME})
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("error de connection a MongoDB : ", error));

// utiliser les routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/avis', avisRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

