const booksService = require('../services/books.service');

// Get all books
const getAllBooks = (req, res) => {
    const books = booksService.getAllBooks();

    res.json({
        data: books
    });
};

// Get one book by ID
const getBookById = (req, res) => {
    const book = booksService.getBookById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json({
        data: book
    });
};

module.exports = {
    getAllBooks,
    getBookById
};