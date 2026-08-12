const booksService = require('../services/books.service');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await booksService.getAllBooks();

        res.json({
            data: books
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving books',
            error: error.message
        });
    }
};

// Get one book by ID
const getBookById = async (req, res) => {
    try {
        const book = await booksService.getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.json({
            data: book
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving book',
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById
};