import React from "react";
import "./App.css";
import "./components/api.js";

const App: React.FC = () => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [data, setTodo] = React.useState("");
  return (
    <div>
      <header className="App-header">
        <p>Welcome, {name}</p>
        <label className="Label">
          {date === undefined ? "Date Time Label" : date}
        </label>
      </header>
      <details className="details">
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
        <br></br>
        TODO:{" "}
        <input
          type="text"
          placeholder="Enter new Todo"
          value={data}
          onChange={e => setTodo(e.target.value)}
        />
        <button
          type="submit"
          onSubmit={() => {
            setTodo(data);
            todoApi.create(data.trimEnd());
          }}
        >
          Add TODO
        </button>
      </details>
      <footer></footer>
    </div>
  );
};

export default App;
