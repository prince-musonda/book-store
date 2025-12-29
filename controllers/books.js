const booksTable = require("../models/book.model");
const db = require("../db/index");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async (req, res) => {
  const allbooks = await db.select().from(booksTable);
  res.json(allbooks);
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  const [book] = await db
    .select()
    .from(booksTable)
    .where((book) => eq(book.id, id));
  console.log(book);
  if (!book) {
    return res.status(404).json({ error: `book with id ${id} not found` });
  }
  return res.json(book);
};

exports.addNewBook = async (req, res) => {
  const { title, description, authorId } = req.body;
  console.log(req.body);
  //   input validation
  if (!title || title === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const result = await db
    .insert(booksTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({ id: booksTable.id });

  return res
    .status(200)
    .json({ message: "book created successfully", id: result.id });
};

exports.deleteBookById = async (req, res) => {
  const bookId = req.params.id;
  await db.delete(booksTable).where((book) => eq(book.id, bookId));
  res.json({ success: "done" });
};
