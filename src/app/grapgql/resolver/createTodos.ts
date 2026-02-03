import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function createTodos(
  _: unknown,
  args: { id: string; title: string; isDone: string },
  ctx: { env: { todo_db: D1Database } },
) {
  const db = getDb(ctx.env);

  await db.insert(todos).values({
    id: args.id,
    title: args.title,
    isDone: sql`{args.isDone ? 1 : 0}`,
  });

  return {
    id: args.id,
    title: args.title,
    isDone: args.isDone,
  };
}
