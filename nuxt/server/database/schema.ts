import { serial, pgTable, text, integer } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  book_for_years: integer("book_for_years"),
  refresh_token: text("refresh_token"),
});

export type userSchemaSelect = typeof Users.$inferSelect;
export type userSchemaInsert = typeof Users.$inferInsert;
