const express = require("express");
const db = require("../db/index");
const authorsTable = require("../models/author.model");
const { eq } = require("drizzle-orm");
const { booksTable } = require("../models");

const router = express();

// get all authors
router.get("/", async (req, res) => {
  const search = req.query.authorId;
  const authors = await db.select().from(authorsTable);
  return res.json(authors);
});

// get author by id
router.get("/:id", async (req, res) => {
  const [author] = await db
    .select()
    .from(authorsTable)
    .where((author) => eq(author.id, req.params.id));

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  return res.status(200).json(author);
});

// add new author
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const result = await db
    .insert(authorsTable)
    .values({ name, email })
    .returning({ id: authorsTable.id });
  return res.json({ message: "author has been created", id: result.id });
});

// get all books by an author
router.get("/:id/books", async () => {
  const authorId = req.params.id;
  const books = await db
    .select()
    .from(booksTable)
    .where((book) => eq(book.authorId, authorId));
  if (!books) {
    return res.status(404).json({ error: "author not found" });
  }
  return res.status(200).json(books);
});

module.exports = router;
