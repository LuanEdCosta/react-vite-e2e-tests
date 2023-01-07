import { useRef, useState } from "react";

import "./styles/App.scss";

export function App() {
  const taskRef = useRef<HTMLInputElement | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo();
    taskRef.current?.focus();
  };

  return (
    <form className="app" onSubmit={handleSubmit} noValidate>
      <div className="container">
        <label className="label" htmlFor="task">
          Task
        </label>

        <input
          id="task"
          ref={taskRef}
          value={task}
          className="input"
          placeholder="Type a Task"
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="create-button" type="submit">
          Create Task
        </button>

        {todos.length > 0 && (
          <ul className="list">
            {todos.map((todo, index) => {
              return (
                <li className="item" key={todo}>
                  <span>{todo}</span>{" "}
                  <button
                    className="delete-button"
                    onClick={() => handleRemoveTodo(index)}
                  >
                    <span>x</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </form>
  );
}
