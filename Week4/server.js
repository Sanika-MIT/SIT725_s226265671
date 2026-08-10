const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 3000;


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// MongoDB connection

mongoose.connect("mongodb://127.0.0.1:27017/bookDB");

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
});


// Routes

const bookRoutes = require("./routes/books");

app.use("/api/books", bookRoutes);



app.listen(port,()=>{

    console.log("Server running on port " + port);

});