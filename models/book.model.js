const { pgTable, uuid, varchar, text, index } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    title_gin_idx: index("title_gin_idx").using("gin").on(table.title),
  })
);

module.exports = booksTable;
