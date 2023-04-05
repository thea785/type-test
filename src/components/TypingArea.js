import React from "react";

function TypingArea(props) {
  const { stanza, displayStanza, wordInput, stanzaIndex, combinedStanza } =
    props;

  // {displayStanza.length > 0 && displayStanza[index][wIndex].length > 0 && lIndex < displayStanza[index][wIndex].length ? displayStanza[index][wIndex].split("")[lIndex] : letter}

  return (
    <p>
      {combinedStanza.map((line, index) => {
        return (
          <span key={index}>
            {line.map((word, wIndex) => {
              return (
                <span key={wIndex}>
                  {" "}
                  {word.split("").map((letter, lIndex) => {
                    return (
                      <span
                        key={lIndex}
                        style={{
                          ...(stanzaIndex[0] === index &&
                          stanzaIndex[1] === wIndex &&
                          lIndex === wordInput.length
                            ? {
                                background: "#262c2c",
                              }
                            : {}),
                          ...(letter === "h"
                            ? {
                                color: "#0E8388",
                              }
                            : {}),
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}{" "}
                </span>
              );
            })}
            <br />
          </span>
        );
      })}
    </p>
  );
}

// Letter JSX
// <Letter index={index} wIndex={wIndex} lIndex={lIndex} character={letter} stanza={stanza} displayStanza={displayStanza} wordInput={wordInput} stanzaIndex={stanzaIndex}/>

/* <span
key={lIndex}
style={{
  ...(stanzaIndex[0] === index &&
  stanzaIndex[1] === wIndex &&
  lIndex === wordInput.length
    ? {
        background: "#262c2c",
      }
    : {}),
  ...(letter === "h"
    ? {
        color: "#0E8388",
      }
    : {}),
}}
>
{letter}
</span> */

export default TypingArea;
