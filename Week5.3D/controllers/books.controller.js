const booksService = require('../services/books.service');

const allowedFields = [
    'id',
    'title',
    'author',
    'year',
    'genre',
    'summary',
    'price'
];

const validateFields = (body) => {
    const receivedFields = Object.keys(body);

    const unexpectedFields = receivedFields.filter(
        field => !allowedFields.includes(field)
    );

    if (unexpectedFields.length > 0) {
        return `Unexpected field(s): ${unexpectedFields.join(', ')}`;
    }

    return null;
};

const validateTypes = (body, isUpdate = false) => {
    const stringFields = [
        'id',
        'title',
        'author',
        'genre',
        'summary'
    ];

    for (const field of stringFields) {
        if (body[field] !== undefined && typeof body[field] !== 'string') {
            return `${field} must be a string`;
        }
    }

    if (body.year !== undefined && typeof body.year !== 'number') {
        return 'year must be a number';
    }

    if (
        body.year !== undefined &&
        !Number.isInteger(body.year)
    ) {
        return 'year must be an integer';
    }

    if (body.price !== undefined && typeof body.price !== 'string') {
        return 'price must be a string representing a Decimal128 value';
    }

    return null;
};


// GET ALL BOOKS
const getAllBooks = async (req, res) => {
    try {
        const books = await booksService.getAllBooks();

        res.status(200).json({
            data: books
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving books',
            error: error.message
        });
    }
};


// GET BOOK BY ID
const getBookById = async (req, res) => {
    try {
        const book = await booksService.getBookById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            data: book
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving book',
            error: error.message
        });
    }
};


// CREATE BOOK
const createBook = async (req, res) => {
    try {

        // Reject unknown fields
        const fieldError = validateFields(req.body);

        if (fieldError) {
            return res.status(400).json({
                message: fieldError
            });
        }

        // Reject incorrect types
        const typeError = validateTypes(req.body);

        if (typeError) {
            return res.status(400).json({
                message: typeError
            });
        }

        const book = await booksService.createBook(req.body);

        return res.status(201).json({
            data: book
        });

    } catch (error) {

        // Duplicate id
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'A book with this id already exists'
            });
        }

        // Mongoose validation error
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors)
                .map(err => err.message);

            return res.status(400).json({
                message: 'Validation failed',
                errors: messages
            });
        }

        return res.status(500).json({
            message: 'Error creating book',
            error: error.message
        });
    }
};


// UPDATE BOOK
const updateBook = async (req, res) => {
    try {

        // Reject unknown fields
        const fieldError = validateFields(req.body);

        if (fieldError) {
            return res.status(400).json({
                message: fieldError
            });
        }

        // id cannot be changed
        if (Object.prototype.hasOwnProperty.call(req.body, 'id')) {
            return res.status(400).json({
                message: 'Book id is immutable and cannot be changed'
            });
        }

        // Reject incorrect types
        const typeError = validateTypes(req.body, true);

        if (typeError) {
            return res.status(400).json({
                message: typeError
            });
        }

        const book = await booksService.updateBook(
            req.params.id,
            req.body
        );

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            data: book
        });

    } catch (error) {

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors)
                .map(err => err.message);

            return res.status(400).json({
                message: 'Validation failed',
                errors: messages
            });
        }

        return res.status(500).json({
            message: 'Error updating book',
            error: error.message
        });
    }
};


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};