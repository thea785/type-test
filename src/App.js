import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/type-test/data.json")
      .then((response) => response.json())
      .then((jsonData) => setItems(jsonData.items));
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
      </header>
    </div>
  );
}

export default App;