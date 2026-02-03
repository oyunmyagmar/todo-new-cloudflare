import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

const typeDefs = gql`
  type Todo {
    id: Int!
    content: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(content: String!): Todo
    toggleTodo(id: Int!, completed: Boolean!): Todo
    deleteTodo(id: Int!): Todo
  }
`;

const resolvers = {
  Query: {
    getTodos: async (_: any, __: any, context: any) => {
      const db = getDb(context.env);
      return await db.select().from(todos).all();
    },
  },
  Mutation: {
    addTodo: async (_: any, { content }: { content: string }, context: any) => {
      const db = getDb(context.env);
      const result = await db.insert(todos).values({ content }).returning();
      return result[0];
    },
    toggleTodo: async (
      _: any,
      { id, completed }: { id: number; completed: boolean },
      context: any,
    ) => {
      const db = getDb(context.env);
      const result = await db
        .update(todos)
        .set({ completed })
        .where(eq(todos.id, id))
        .returning();
      return result[0];
    },
    deleteTodo: async (_: any, { id }: { id: number }, context: any) => {
      const db = getDb(context.env);
      const result = await db.delete(todos).where(eq(todos.id, id)).returning();
      return result[0];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const env = (req as any).context?.cloudflare?.env || process.env;
    return { env };
  },
});

export { handler as GET, handler as POST };
export const runtime = "edge";
