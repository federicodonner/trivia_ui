import React, { useState, useEffect } from "react";
import "./juego.css";
import Tablero from "../tablero/Tablero";
import Pregunta from "../pregunta/Pregunta";
import PieEquipos from "../pieEquipos/PieEquipos";
import { accederAPI } from "../../utils/fetchFunctions";

export default function Juego(props) {
  const [loader, setLoader] = useState(true);
  const [juego, setJuego] = useState(null);
  const [equipos, setEquipos] = useState(null);

  const [juegoLoader, setJuegoLoader] = useState(false);
  const [mostrarTablero, setMostrarTablero] = useState(true);

  const [pregunta, setPregunta] = useState(null);

  useEffect(() => {
    // Va a buscar el juego indicado en el hash
    accederAPI(
      "GET",
      "trivia_juegohash/" + props.match.params.id,
      null,
      (respuesta) => {
        setEquipos(respuesta.equipos);
        setJuego(respuesta);
        setLoader(false);
      },
      (respuesta) => {
        alert(respuesta.detail);
      }
    );
  }, []);

  // Siempre que se carga una pregunta, apaga el loader
  useEffect(() => {
    setJuegoLoader(false);
  }, [pregunta]);

  // Función ejecutada por el tablero cuando se selecciona una pregunta
  function navegarAPregunta(hashPregunta) {
    // Enciende el loader del main
    setJuegoLoader(true);
    // Va a buscar el contenido de la pregunta
    accederAPI(
      "GET",
      "trivia_preguntahash/" + hashPregunta,
      null,
      (respuesta) => {
        setPregunta(respuesta);
      },
      (respuesta) => {
        alert(respuesta.detail);
        setJuegoLoader(false);
      }
    );
  }

  function volverATablero() {
    setJuegoLoader(true);
    setPregunta(null);
  }

  // Función ejecutada cuando vuelve de responder una pregunta
  function actualizarEquipos(equipos) {
    // Marca la pregunta como respondida en el tablero
    var juegoParaEditar = JSON.parse(JSON.stringify(juego));
    juegoParaEditar.categorias.forEach((categoria) => {
      categoria.preguntas.forEach((preguntaEnCategoria) => {
        if (preguntaEnCategoria.id == pregunta.id) {
          preguntaEnCategoria.respondida = 1;
        }
      });
    });
    setJuego(juegoParaEditar);

    setEquipos(equipos);
    setPregunta(null);
  }

  return (
    <div className="app-view cover">
      <div className="scrollable">
        {loader && (
          <div className="loader-container">
            <img className="loader" src="/images/cerebroLudicamente.png" />
            <p>Cargando juego</p>
          </div>
        )}
        {!loader && (
          <>
            <div className="content">
              <div className="cabezalEmpresa">
                <div className="nombreEmpresa">{juego.empresa}</div>
                <div className="taglineJuego">{juego.tagline}</div>
              </div>
              <div className="containerMain">
                {juegoLoader && (
                  <div className="loader-container">
                    <img
                      className="loader"
                      src="/images/cerebroLudicamente.png"
                    />
                    <p>Cargando pregunta</p>
                  </div>
                )}
                {!juegoLoader && !pregunta && (
                  <Tablero juego={juego} navegarAPregunta={navegarAPregunta} />
                )}
                {!juegoLoader && pregunta && (
                  <Pregunta
                    juego={juego}
                    pregunta={pregunta}
                    volverATablero={volverATablero}
                    actualizarEquipos={actualizarEquipos}
                  />
                )}
              </div>
              <PieEquipos equipos={equipos} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
