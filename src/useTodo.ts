import { useState } from "react";

export function useTodo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (task === "" || todos.includes(task)) return;
    setTodos((currentTodos) => [...currentTodos, task]);
    setTask("");
  };

  const handleRemoveTodo = (index: number) => {
    setTodos((currentTodos) => {
      const todosClone = [...currentTodos];
      todosClone.splice(index, 1);
      return todosClone;
    });
  };

  return {
    task,
    todos,
    setTask,
    setTodos,
    handleAddTodo,
    handleRemoveTodo,
  };
}
