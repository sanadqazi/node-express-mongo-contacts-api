const express = require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const env = require('dotenv').config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes.js'));
app.use('/api/user', require('./routes/userRoutes.js'));
app.use(errorHandler);

app.listen(port, () => {

});

