import "./App.css";
import React, { useState, useEffect } from "react";
import TypingArea from "./components/TypingArea";
import { stanzaOrder } from "./Helper.js";

function App() {
  const [stanza, setStanza] = useState([]); // The current stanza
  const [input, setInput] = useState(""); // The most recent keyboard input
  const [wordInput, setWordInput] = useState(""); // The current word the user is typing
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // The index of the current word to be typed
  const [currentStanza, setCurrentStanza] = useState(0); // Index of the current stanza index in stanzaOrder

  // Read in a random stanza whenever the currentStanza changes
  useEffect(() => {
    fetch("/type-test/data.json")
      .then((response) => response.json())
      .then((jsonData) =>
        setStanza(jsonData.items[stanzaOrder[currentStanza]])
      );
  }, [currentStanza]);

  // Function used by event listener for handling keyboard input
  const handleKeyDown = (event) => {
    setInput(event.key);
    if (event.key === "Backspace" && wordInput.length > 0) {
      // handle backspace
      setWordInput((prevWordInput) => prevWordInput.slice(0, -1));
    } else if (event.key === "Enter" || event.key === " ") {
      // handle space or enter
      if (wordInput.length > 0) {
        setCurrentWordIndex(currentWordIndex + 1); // Goto the next word
        setWordInput("");
      }
    } else if (event.key.length === 1) {
      setWordInput((prevWordInput) => prevWordInput + event.key);
    }
  };
  // Set up event listener for keyboard input
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wordInput]);

  // Handles when the currentWordIndex is updated
  useEffect(() => {
    if (currentWordIndex >= stanza.flat().length) {
      // Check if we are done with the current stanza
      setCurrentStanza((currentStanza + 1) % stanzaOrder.length);
      setCurrentWordIndex(0);
    }
  }, [currentWordIndex]);

  // function for testing incrementstanza button
  // need to replace this with incrementing whenever the stanza is complete
  function incrementStanza() {
    setCurrentStanza((currentStanza + 1) % stanzaOrder.length);
  }

  return (
    <div className="App">
      <button onClick={incrementStanza}>new stanza</button>
      <TypingArea
        stanza={stanza}
        currentWordIndex={currentWordIndex}
        wordInput={wordInput}
      />
      <p>{input}</p>
      <p>{wordInput}</p>
      <p>{stanza.flat()[currentWordIndex]}</p>
    </div>
  );
}

export default App;
