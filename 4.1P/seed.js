const mongoose = require("mongoose");
const Book = require("./models/Book");


mongoose.connect("mongodb://127.0.0.1:27017/bookDB");


const books = [

{
title:"The Alchemist",
image:"images/book1.jpg",
author:"Paulo Coelho",
description:"A story about dreams and destiny."
},

{
title:"Atomic Habits",
image:"images/book2.jpg",
author:"James Clear",
description:"A guide to building good habits."
},

{
title:"Ikigai",
image:"images/book3.jpg",
author:"Hector Garcia",
description:"Japanese philosophy about purpose."
}

];


Book.insertMany(books)
.then(()=>{

console.log("Books inserted");

mongoose.connection.close();

});