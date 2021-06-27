import React from "react";
import "./tablero.css";
import BotonPregunta from "../botonPregunta/BotonPregunta";

export default function Tablero(props) {
  return (
    <div className="containerCategorias">
      {props.juego.categorias.map((categoria) => {
        return (
          <div
            key={categoria.id}
            className={categoria.count % 2 != 0 ? "categoria" : "categoria par"}
          >
            <div className="tituloCategoria">{categoria.nombre}</div>
            <div className="containerBotonesPreguntas">
              {categoria.preguntas.map((pregunta) => {
                return (
                  <BotonPregunta
                    key={pregunta.id}
                    pregunta={pregunta}
                    navegarAPregunta={props.navegarAPregunta}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
