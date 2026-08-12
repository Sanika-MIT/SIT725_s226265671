const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.controller');

// GET /api/books
router.get('/', booksController.getAllBooks);

// GET /api/books/:id
router.get('/:id', booksController.getBookById);

module.exports = router;