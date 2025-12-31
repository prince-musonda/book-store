const express = require("express");
const booksRouter = require("./routes/books.route");
const authorsRouter = require("./routes/authors.route");
const loggerMidleware = require("./middleware/loggerMidleware");
require("dotenv/config");

// express app initialization
const app = express();

// ////////////////////////////////////app middlewares////////////////////////////////////////////////////////////
app.use(express.json());
// write logs middleware
app.use(loggerMidleware);

///////////////// routes/////////////////////////////////////////////////////////////////////
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
// invalid url route
app.use((req, res, next) => {
  res.status(404).json({ error: "invalid url path" });
});

app.listen(8000, () => {
  console.log("server is running on Port 8000");
});
