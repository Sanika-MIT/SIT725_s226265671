const express = require("express");
const router = express.Router();

const Book = require("../models/Book");


router.get("/", async (req, res) => {

    try {

        const books = await Book.find({});

        res.json({
            statusCode: 200,
            data: books,
            message: "Books retrieved successfully"
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;