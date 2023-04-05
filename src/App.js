import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Read in JSON data
  useEffect(() => {
    fetch("/type-test/data.json")
      .then((response) => response.json())
      .then((jsonData) => setItems(jsonData.items));
  }, []);

  // Handle user keyboard input
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
      <p>
        {items.map((line, index) => {
          return (
            <span key={index}>
              {line.map((word, wIndex) => {
                return (
                  <span key={wIndex}> {word.split('').map((letter, lIndex) => {
                    return (
                      <span key="lIndex">{letter}</span>
                    )
                  })} </span>
                );
              })}
              <br />
            </span>
          );
        })}
      </p>
      <p>{input}</p>
    </div>
  );
}

export default App;
