import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { title } from "process";

export async function getTodos(
  _: unknown,
  __: unknown,
  ctx: { env: { todo_db: D1Database } },
) {
  const db = getDb(ctx.env);

  const allTodos = await db.select().from(todos).all();

  return allTodos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    isDone: todo.isDone,
  }));
}
