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
  const [stanzaIndex, setStanzaIndex] = useState([0, 0]); // Index of current word in stanza form
  const [displayStanza, setDisplayStanza] = useState([]); // Starts empty, fills up with user input
  const [combinedStanza, setCombinedStanza] = useState([]); // Combination of both displayStanza and stanza
  const [letterState, setLetterState] = useState([]); // 0 is untyped, 1 is typed, 2 is incorrectly typed

  // Read in a random stanza whenever the currentStanza changes
  useEffect(() => {
    fetch("/type-test/data.json")
      .then((response) => response.json())
      .then((jsonData) =>
        setStanza(jsonData.items[stanzaOrder[currentStanza]])
      );
  }, [currentStanza]);

  // Set up states displayStanza, combinedStanza, and letterState
  useEffect(() => {
    let displayArray = [];
    let combinedArray = [];
    let letterArray = [];
    for (let i = 0; i < stanza.length; i++) {
      displayArray[i] = [];
      combinedArray[i] = [];
      letterArray[i] = [];
      for (let j = 0; j < stanza[i].length; j++) {
        displayArray[i][j] = "";
        combinedArray[i][j] = stanza[i][j].slice();
        letterArray[i][j] = Array(stanza[i][j].length).fill(0);
      }
    }
    setDisplayStanza(displayArray);
    setCombinedStanza(combinedArray);
    setLetterState(letterArray);
  }, [stanza]);

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

  // Update states when the wordInput changes
  useEffect(() => {
    if (displayStanza.length > 0) {
      // <-- check if the stanza values are ready

      // Check for too long word input
      if (wordInput.length > stanza[stanzaIndex[0]][stanzaIndex[1]].length) {
        setWordInput((prevWordInput) => prevWordInput.slice(0, -1));
      }

      if (wordInput !== "") {
        let copy = [...displayStanza];
        copy[stanzaIndex[0]][stanzaIndex[1]] = wordInput;
        setDisplayStanza(copy);
      }

      let combinedCopy = [...combinedStanza];
      combinedCopy[stanzaIndex[0]][stanzaIndex[1]] =
        wordInput +
        stanza[stanzaIndex[0]][stanzaIndex[1]].slice(wordInput.length);
      setCombinedStanza(combinedCopy);

      let letterCopy = [...letterState];
      if (wordInput.length > 0) {
        for (
          let i = 0;
          i < combinedStanza[stanzaIndex[0]][stanzaIndex[1]].length;
          i++
        ) {
          if (i >= wordInput.length) {
            letterCopy[stanzaIndex[0]][stanzaIndex[1]][i] = 0; // Not typed yet
          } else if (
            stanza[stanzaIndex[0]][stanzaIndex[1]][i] === wordInput[i]
          ) {
            letterCopy[stanzaIndex[0]][stanzaIndex[1]][i] = 1; // Matching letter
          } else {
            letterCopy[stanzaIndex[0]][stanzaIndex[1]][i] = 2; // Non-matching letter
          }
        }
      }

      console.log(letterState);
    }
  }, [wordInput]);

  // Handles when the currentWordIndex is updated
  useEffect(() => {
    if (currentWordIndex >= stanza.flat().length) {
      // Check if we are done with the current stanza
      setCurrentStanza((currentStanza + 1) % stanzaOrder.length);
      setCurrentWordIndex(0);
    }
    // Set the stanzaIndex (used for indexing to the stanza in TypingArea)
    if (stanza.length !== 0) {
      if (currentWordIndex < stanza[0].length) {
        setStanzaIndex([0, currentWordIndex]);
      } else if (currentWordIndex < stanza[0].length + stanza[1].length) {
        setStanzaIndex([1, currentWordIndex - stanza[0].length]);
      } else {
        setStanzaIndex([
          2,
          currentWordIndex - stanza[0].length - stanza[1].length,
        ]);
      }
    }
  }, [currentWordIndex]);

  return (
    <div className="App">
      <TypingArea
        wordInput={wordInput}
        stanzaIndex={stanzaIndex}
        combinedStanza={combinedStanza}
        letterState={letterState}
      />
    </div>
  );
}

export default App;
