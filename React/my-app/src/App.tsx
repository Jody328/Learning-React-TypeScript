import React, { useEffect } from "react";
import "./App.css";
import { genericApi } from "./components/api";
import { TodoList } from "./components/TodoList";
import { NewTodo } from "./components/newTodo";

export type todoType = {
  id: number;
  value: string;
  isCompleted: boolean;
};
const genericTodos = genericApi<todoType>("todos");

const App: React.FC = () => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [todos, setTodos] = React.useState<todoType[]>([]);

  useEffect(() => {
    genericTodos.all().then(items => {
      if (search) {
        setTodos(
          items.filter(item =>
            item.value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        );
      } else {
        setTodos(items);
      }
    });
  }, [search]);

  return (
    <div className="app">
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
        <h1>TodoList</h1>
        <div className="search">
          <input
            type="text"
            name="searchValue"
            placeholder="Search"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="sort">
          <button
            onClick={() => {
              genericTodos.all().then(items => {
                setTodos(items);
              });
            }}
          >
            ALL
          </button>{" "}
          <button
            onClick={() => {
              genericTodos.filterBy("isCompleted", false).then(items => {
                setTodos(items);
              });
            }}
          >
            TO-DO
          </button>{" "}
          <button
            onClick={() => {
              genericTodos.filterBy("isCompleted", true).then(items => {
                setTodos(items);
              });
            }}
          >
            DONE
          </button>
        </div>
        <TodoList todos={todos} />
      </div>
      <footer></footer>
    </div>
  );
};
export default App;
