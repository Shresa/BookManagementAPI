require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const publications = require("./API/Publication");

// Iniatializing express
const Bookly = express();

// Configuration
Bookly.use(express.json());

//Establish Database connection
mongoose.connect(
   process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
   })
   .then(() => console.log("connection established!!"));

// Initializing Microservices
Bookly.use("/book", Books);
Bookly.use("/author", Authors);
Bookly.use("/publication", publications);


Bookly.listen(3000, () => console.log("Server Running!!"));