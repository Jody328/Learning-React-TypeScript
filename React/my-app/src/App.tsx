import React, { useEffect } from "react";
import "./App.css";
import { genericApi } from "./components/api";
import { TodoList } from "./components/TodoList";
import { NewTodo } from "./components/newTodo";

type todoType = {
  id: number;
  value: string;
};

const genericTodos = genericApi<todoType>("todos");

const App: React.FC = () => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [todos, setTodos] = React.useState<todoType[]>([]);

  useEffect(() => {
    genericTodos.all().then(items => {
      setTodos(items);
    });
  }, []);

  return (
    <div>
      <header className="App-header">
        <p>Welcome, {name}</p>
        <label className="Label">
          {date === undefined ? "Date Time Label" : date}
        </label>
      </header>
      <div className="details">
        Name:{" "}
        <input
          type="text"
          placeholder="Enter your name"
          onChange={e => setName(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            setDate(today.toString());
          }}
          className="button"
        >
          DateTime
        </button>
        <NewTodo />
        <TodoList todos={todos} />
      </div>
      <footer></footer>
    </div>
  );
};
export default App;
