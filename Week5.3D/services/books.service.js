const Book = require('../models/book.model');


// Get all books
const getAllBooks = async () => {
    return await Book.find({});
};


// Get one book
const getBookById = async (id) => {
    return await Book.findOne({ id });
};


// Create a book
const createBook = async (bookData) => {
    const book = new Book(bookData);

    return await book.save();
};


// Update a book
const updateBook = async (id, updateData) => {
    return await Book.findOneAndUpdate(
        { id },
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    );
};


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};