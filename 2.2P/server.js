const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add two numbers
// Example:
// http://localhost:3000/add?a=5&b=10

app.get('/add', (req, res) => {

    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.send("Please provide valid numbers.");
    }

    const sum = a + b;

    res.send(`The sum of ${a} and ${b} is ${sum}`);
});

// Subtract

app.get('/subtract', (req, res) => {

    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.send("Please provide valid numbers.");
    }

    res.send(`Result = ${a - b}`);
});

// Multiply

app.get('/multiply', (req, res) => {

    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.send("Please provide valid numbers.");
    }

    res.send(`Result = ${a * b}`);
});

// Divide

app.get('/divide', (req, res) => {

    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.send("Please provide valid numbers.");
    }

    if (b == 0) {
        return res.send("Cannot divide by zero.");
    }

    res.send(`Result = ${a / b}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});