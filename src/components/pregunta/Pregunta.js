import React, { useState, useEffect } from "react";
import "./pregunta.css";
import PieEquipos from "../pieEquipos/PieEquipos";
import { accederAPI } from "../../utils/fetchFunctions";

export default function Pregunta(props) {
  const [pregunta, setPregunta] = useState(props.pregunta);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  function callbackErrorPUTRespuesta(error) {}

  function marcarRespuesta(respuestaCorrecta) {
    accederAPI(
      "PUT",
      "trivia_respuesta/" + pregunta.hash,
      { respuestaCorrecta },
      (respuesta) => {
        props.actualizarEquipos(respuesta.equipos);
      },
      (respuesta) => {
        alert(respuesta.detail);
        props.volverATablero();
      }
    );
  }

  return (
    <div className="containerPregunta">
      <div className="categoriaPregunta">
        {pregunta.categoria_nombre} x {pregunta.puntaje} puntos
      </div>

      <div className="textoPregunta">{pregunta.texto}</div>
      {(mostrarRespuesta || pregunta.respondida) && (
        <div className="textoPregunta">{pregunta.respuesta}</div>
      )}
      {!pregunta.respondida && (
        <div
          onClick={() => {
            setMostrarRespuesta(true);
          }}
          className="botonMostrarRespuesta"
        >
          <span className="block">MOSTRAR</span> RESPUESTA
        </div>
      )}
      {pregunta.respondida && (
        <div onClick={props.volverATablero} className="botonMostrarRespuesta">
          <span className="block">VOLVER A</span> PREGUNTAS
        </div>
      )}
      {mostrarRespuesta && (
        <div className="botonesRespuesta">
          <div
            onClick={() => {
              marcarRespuesta(1);
            }}
            className="botonRespuesta correcta"
          ></div>
          <div
            onClick={() => {
              marcarRespuesta(0);
            }}
            className="botonRespuesta incorrecta"
          ></div>
        </div>
      )}
    </div>
  );
}
