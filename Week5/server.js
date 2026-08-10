const express = require('express');

const app = express();
const PORT = 3000;


const booksRoute = require('./routes/books.routes');


app.use(express.static('public'));


app.use('/api/books', booksRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});