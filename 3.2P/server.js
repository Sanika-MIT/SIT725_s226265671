const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;

const books = [
    {
        title: "The Alchemist",
        image: "images/book1.jpg",
        author: "Paulo Coelho",
        description: "A story about following your dreams."
    },
    {
        title: "A Thousand Splendid Suns",
        image: "images/book2.jpg",
        author: "Khaled Hosseini",
        description: "A powerful novel about friendship, resilience, and hope in Afghanistan."
    },
    {
        title: "Ikigai",
        image: "images/book3.jpg",
        author: "Héctor García & Francesc Miralles",
        description: "Explores the Japanese philosophy of purpose and living a meaningful life."
    }
];

app.get("/api/books", (req, res) => {
    res.json({
        statusCode: 200,
        data: books
    });
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});