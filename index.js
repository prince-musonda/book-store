const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

// in memory database
const books = [];

// express app initialization
const app = express();

// app middlewares
app.use(express.json());

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `[${Date.now()}]  ${req.method}  ${req.url}\n`,
    (error) => {}
  );
  next();
});

///////////////// routes/////////////////////////////////////////////////////////////////////

// get all books route
app.get("/books", (req, res) => {
  res.removeHeader("x-powered-by");
  res.json(books);
});

// get book by id route
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400);
    return res.json({ error: "Bad request. ID must be number" });
  }
  const book = books.find((book) => book.id == id);
  console.log(book);
  if (!book) {
    return res.status(404).json({ error: `book with id ${id} not found` });
  }
});

// create a book route
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  //   input validation
  if (!title || author === "") {
    return res.status(400).json({ error: "title is required" });
  }
  if (!author || author === "") {
    return res.status(400).json({ error: "author name is required" });
  }
  // add book
  const book = { id: books.length + 1, title, author };
  books.push(book);
  return res
    .status(200)
    .json({ message: "book created successfully", ...book });
});

// delete book by id route
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res
      .status(400)
      .json({ error: "Bad request. Book Id must be number" });
  }
  //find index of book from the in memory database
  const bookIndex = books.findIndex((book) => book.id == bookId);
  if (bookIndex >= 0) {
    // remove book from database if book is found
    const removedBook = books.splice(bookIndex, 1);
    return res.status(201).json({
      message: `successfully deleted`,
      book: removedBook,
    });
  } else {
    // return error message if book not found
    return res
      .status(404)
      .json({ error: `the book with id ${bookId} does not exist` });
  }
});

// invalid url route
app.use((req, res, next) => {
  res.status(404).json({ error: "invalid url path" });
});

app.listen(8000, () => {
  console.log("server is running on Port 8000");
});
