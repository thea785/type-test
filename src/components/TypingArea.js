import React, { useEffect, useState } from "react";

function TypingArea(props) {
  const { stanza, currentWordIndex, wordInput, stanzaIndex } = props;

  return (
    <p>
      {stanza.map((line, index) => {
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
                                color: "#CBE4DE",
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

export default TypingArea;
