import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(new Date().toISOString()),
});
