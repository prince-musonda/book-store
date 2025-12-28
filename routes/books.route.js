const express = require("express");
const booksController = require("../controllers/books");

const router = express.Router();

// get all books route
router.get("/", booksController.getAllBooks);

// get book by id route
router.get("/:id", booksController.getBookById);

// create a book route
router.post("/", booksController.addNewBook);

// delete book by id route
router.delete("/:id", booksController.deleteBookById);

module.exports = router;
