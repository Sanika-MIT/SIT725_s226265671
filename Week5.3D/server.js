const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());


// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/sit725_5_2c';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Import books routes
const booksRoute = require('./routes/books.routes');

// Serve files from public folder
app.use(express.static('public'));

// Mount books API routes
app.use('/api/books', booksRoute);

app.get('/api/integrity-check42', (req, res) => {
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});