import React, { useState } from "react";

function TypingArea(props) {
    const {stanza} = props;

    return (
        <p>
        {stanza.map((line, index) => {
          return (
            <span key={index}>
              {line.map((word, wIndex) => {
                return (
                  <span key={wIndex}> {word.split('').map((letter, lIndex) => {
                    return (
                      <span key={lIndex}>{letter}</span>
                    )
                  })} </span>
                );
              })}
              <br />
            </span>
          );
        })}
      </p>
    )
}

export default TypingArea;