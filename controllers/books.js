const { booksDatabase } = require("../models/books");

exports.getAllBooks = (req, res) => {
  res.json(booksDatabase);
};

exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400);
    return res.json({ error: "Bad request. ID must be number" });
  }
  const book = booksDatabase.find((book) => book.id == id);
  console.log(book);
  if (!book) {
    return res.status(404).json({ error: `book with id ${id} not found` });
  }
};

exports.addNewBook = (req, res) => {
  const { title, author } = req.body;
  //   input validation
  if (!title || author === "") {
    return res.status(400).json({ error: "title is required" });
  }
  if (!author || author === "") {
    return res.status(400).json({ error: "author name is required" });
  }
  // add book
  const book = { id: booksDatabase.length + 1, title, author };
  booksDatabase.push(book);
  return res
    .status(200)
    .json({ message: "book created successfully", ...book });
};

exports.deleteBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res
      .status(400)
      .json({ error: "Bad request. Book Id must be number" });
  }
  //find index of book from the in memory database
  const bookIndex = booksDatabase.findIndex((book) => book.id == bookId);
  if (bookIndex >= 0) {
    // remove book from database if book is found
    const removedBook = booksDatabase.splice(bookIndex, 1);
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
};
