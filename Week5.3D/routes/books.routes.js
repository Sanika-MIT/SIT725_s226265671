const express = require('express');

const router = express.Router();

const booksController = require('../controllers/books.controller');


// Existing GET routes
router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getBookById);


// Safe-write routes
router.post('/', booksController.createBook);

router.put('/:id', booksController.updateBook);


module.exports = router;