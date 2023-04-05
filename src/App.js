import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/type-test/data.json")
      .then((response) => response.json())
      .then((jsonData) => setItems(jsonData.items));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        setInput((prevInput) => prevInput.slice(0, -1));
      } else if (event.key.length === 1) {
        setInput((prevInput) => prevInput + event.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>List of items:</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{input}</p>
      </header>
    </div>
  );
}

export default App;