"use client";

import { gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@apollo/client/react";
import { Checkbox } from "@/components/ui/checkbox";

const ADD_TODO = gql`
  mutation AddTodo($content: String!) {
    addTodo(content: $content) {
      id
      content
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      content
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!, $completed: Boolean!) {
    toggleTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export default function TodoPage() {
  const [content, setContent] = useState("");
  const { data, loading, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleAddTodo = async () => {
    if (!content) return alert("Please enter a task!");

    try {
      await addTodo({
        variables: {
          content,
        },
      });
      setContent("");
      refetch();
    } catch (e) {
      console.error("Mutation error:", e);
    }
  };

  const handleToggleChecked = async (id: number, currentStatus: boolean) => {
    await toggleTodo({
      variables: { id, completed: !currentStatus },
    });
    refetch();
  };

  const handleDeleteCompletedTodo = async (id: number) => {
    await deleteTodo({
      variables: { id },
    });
    refetch();
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="w-full h-screen flex flex-col items-center mt-20">
      Hello World ToDo
      <Card>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add new task here..."
              />
              <Button onClick={handleAddTodo}>Add</Button>
            </div>
            <div className="flex flex-col gap-2">
              {data?.getTodos?.map((todo: any) => (
                <div
                  key={todo.id}
                  className="flex justify-between items-center"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() =>
                      handleToggleChecked(todo.id, todo.completed)
                    }
                  />
                  <div>{todo.content}</div>
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDeleteCompletedTodo(todo.id)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
