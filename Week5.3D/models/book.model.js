const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, 'Book id is required'],
            match: [/^b\d+$/, 'Book id must start with b and contain only digits after it'],
            maxlength: [20, 'Book id must not exceed 20 characters']
        },

        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [1, 'Title must contain at least 1 character'],
            maxlength: [200, 'Title must not exceed 200 characters']
        },

        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true,
            minlength: [2, 'Author must contain at least 2 characters'],
            maxlength: [100, 'Author must not exceed 100 characters']
        },

        year: {
            type: Number,
            required: [true, 'Year is required'],
            min: [1000, 'Year must be 1000 or later'],
            max: [currentYear, `Year cannot be later than ${currentYear}`],
            validate: {
                validator: Number.isInteger,
                message: 'Year must be an integer'
            }
        },

        genre: {
            type: String,
            required: [true, 'Genre is required'],
            trim: true,
            minlength: [2, 'Genre must contain at least 2 characters'],
            maxlength: [50, 'Genre must not exceed 50 characters']
        },

        summary: {
            type: String,
            required: [true, 'Summary is required'],
            trim: true,
            minlength: [20, 'Summary must contain at least 20 characters'],
            maxlength: [1000, 'Summary must not exceed 1000 characters']
        },

        price: {
            type: mongoose.Schema.Types.Decimal128,
            required: [true, 'Price is required'],
            validate: {
                validator: function (value) {
                    if (value == null) {
                        return false;
                    }

                    const priceString = value.toString();

                    // Maximum two decimal places
                    if (!/^\d+(\.\d{1,2})?$/.test(priceString)) {
                        return false;
                    }

                    const numericPrice = Number(priceString);

                    return numericPrice >= 0.01 && numericPrice <= 10000;
                },
                message: 'Price must be between 0.01 and 10000 AUD with at most 2 decimal places'
            }
        }
    },
    {
        strict: true
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;