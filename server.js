const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');

//importer les routes
const userRoutes = require('./router/user.routes');


dotenv.config();

const app = express();

// utiliser les routes
app.use('/api', userRoutes);

// connection a la base de données
connectDB();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

