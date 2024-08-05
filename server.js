const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userController);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
