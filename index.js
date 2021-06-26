// Frame work
const express = require("express");

// Database
const database = require("./database/index");

// Iniatializing express
const Bookly = express();

// Configuration
Bookly.use(express.json());

/* 
Route               /
Description         get all books
Access              PUBLIC
Parameters          NONE
Method              GET
*/
Bookly.get("/", (req,res) => {
    return res.json({ books: database.books});
});

/* 
Route               /is
Description         get specific book based on ISBN
Access              PUBLIC
Parameters          isbn
Method              GET
*/
Bookly.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }

    return res.json({book: getSpecificBook});
});

/* 
Route               /c
Description         get specific books based on a category
Access              PUBLIC
Parameters          category
Method              GET
*/
Bookly.get("/c/:category", (req,res) => {
    const getSpecificBooks = database.books.filter((book) => 
    book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }

    return res.json({books: getSpecificBooks });
});

/* 
Route               /author
Description         get all authors
Access              PUBLIC
Parameters          NONE
Method              GET
*/
Bookly.get("/author", (req,res) => {
    return res.json({authors: database.authors});
});

/* 
Route               /author
Description         get all authors
Access              PUBLIC
Parameters          isbn
Method              GET
*/
Bookly.get("/author/:isbn", (req,res) => {
    const getSpecificAuthors = database.authors.filter((author) => 
    author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthors.length === 0) {
        return res.json({
            error: `No author found for the book ${req.params.isbn}`,
        });
    }

    return res.json({authors: getSpecificAuthors });
});

/* 
Route               /publications
Description         get all publications
Access              PUBLIC
Parameters          NONE
Method              GET
*/

Bookly.get("/publications", (req, res) => {
    return res.json({ publications: database.publications});
});

Bookly.listen(3000, () => console.log("Server Running!!"));