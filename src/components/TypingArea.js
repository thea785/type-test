import React from "react";

function TypingArea(props) {
  const { wordInput, stanzaIndex, combinedStanza, letterState } = props;

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
                          ...(letterState[index][wIndex][lIndex] === 1
                            ? {
                                color: "#0E8388",
                              }
                            : {}),
                          ...(letterState[index][wIndex][lIndex] === 2
                            ? {
                                color: "#FF8787",
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
