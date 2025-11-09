const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');

dotenv.config();

const app = express();

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

