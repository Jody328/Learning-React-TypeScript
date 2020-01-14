import React from "react";
import "./App.css";
const App: React.FC = () => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  return (
    <div>
      <header>
        <p>Welcome, {name}</p>

        <label>{date === undefined ? "Date Time Label" : date} </label>
      </header>
      <details>
        Name: <input type="text" onChange={e => setName(e.target.value)} />
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            setDate(today.toString());
          }}
          className="button"
        >
          {" "}
          Click
        </button>
      </details>
      <footer></footer>
    </div>
  );
};

export default App;
