import React, { useState } from "react";
import "./botonPregunta.css";

export default function BotonPregunta(props) {
  const [rollOver, setRollOver] = useState(false);

  function onMouseEnterPregunta(event) {
    setRollOver(true);
  }

  function onMouseLeavePregunta(event) {
    setRollOver(false);
  }

  function navegarAPregunta() {
    props.navegarAPregunta(props.pregunta.hash);
  }

  return (
    <div
      className={
        props.pregunta.respondida
          ? "botonPregunta respondida"
          : rollOver
          ? "botonPregunta rollover"
          : "botonPregunta"
      }
      onMouseEnter={onMouseEnterPregunta}
      onMouseLeave={onMouseLeavePregunta}
      onClick={navegarAPregunta}
    >
      <span> {props.pregunta.puntaje}</span>
    </div>
  );
}
