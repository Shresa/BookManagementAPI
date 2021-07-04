let books = [
    {
        ISBN: "12345ONE",
        title: "Getting started with MERN",
        authors: [1,2],
        language:"en",
        pubDate: "2021-09-03",
        numOfPage:876,
        category: ["fiction","programming","tech","web dev"],
        publication: 1,
    },
    {
        ISBN: "12345two",
        title: "Getting started with Python",
        authors: [1,2],
        language:"en",
        pubDate: "2021-09-03",
        numOfPage:546,
        category: ["fiction","tech","web dev"],
        publication: 1,
    },
];
const authors = [
    {
        id: 1,
        name: "megha",
        books: ["12345ONE" , "12345two"],
    },
    {
        id: 2,
        name: "subha",
        books: ["12345ONE"],
    },
]
const publications = [
    {
        id: 1,
        name: "Chokro",
        books: ["12345ONE"],
    },
];

module.exports = {books,authors,publications};