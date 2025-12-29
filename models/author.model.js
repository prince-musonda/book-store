const { pgTable, uuid, varchar } = require("drizzle-orm/pg-core");

const authorsTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

module.exports = authorsTable;
