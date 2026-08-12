const Book = require('../models/book.model');

// Get all books from MongoDB
const getAllBooks = async () => {
    return await Book.find({});
};

// Get one book by ID from MongoDB
const getBookById = async (id) => {
    return await Book.findOne({ id: id });
};

module.exports = {
    getAllBooks,
    getBookById
};