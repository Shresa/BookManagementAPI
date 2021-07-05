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
Description         get a list of authors based on a book's ISBN
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

/* 
Route               /book/new
Description         add new books
Access              PUBLIC
Parameters          NONE
Method              POST
*/
Bookly.post("/book/new", (req, res) => {
    const {newBook} = req.body;
    database.books.push(newBook);

    return res.json({ books: database.books, message: "book was added"});
});

/* 
Route               /author/new
Description         add new author
Access              PUBLIC
Parameters          NONE
Method              POST
*/
Bookly.post("/author/new", (req, res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);

    return res.json({ authors: database.authors, message: "author  was added"});
});

/* 
Route               /book/update
Description         update title of a book
Access              PUBLIC
Parameters          isbn
Method              PUT
*/
Bookly.put("/book/update/:isbn", (req, res) => {
   database.books.forEach((book) => {
       if(book.ISBN === req.params.isbn) {
       book.title = req.body.bookTitle;
       return;
     }
   });
    return res.json({ books: database.books });
});

/* 
Route               /book/author/update
Description         update/add new author
Access              PUBLIC
Parameters          isbn
Method              PUT
*/
Bookly.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
            return book.authors.push(req.body.newAuthor);
    });

    // update the author database
    database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor)
            return author.books.push(req.params.isbn);
    });

     return res.json({ 
         books: database.books,
         authors: database.authors,
         message: "New author was added",
    });
});

/* 
Route               publication/update/book
Description         update/add new book to a publication
Access              PUBLIC
Parameters          isbn
Method              PUT
*/
Bookly.put("/publication/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publications,
        message: "Successfully updated publication",
    });
});


Bookly.listen(3000, () => console.log("Server Running!!"));