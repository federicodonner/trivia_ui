import React from "react";
import "./pieEquipos.css";

export default function PieEquipos(props) {
  return (
    <div className="pieEquipos">
      <div className="logoLudicamente"></div>

      {props.equipos.map((equipo) => {
        return (
          <div
            key={equipo.id}
            className={
              equipo.activo == 1
                ? "etiquetasEquiposPuntajes activo"
                : "etiquetasEquiposPuntajes"
            }
          >
            <span className="nombreEquipo">{equipo.nombre}</span>
            <span className="puntajes">{equipo.puntaje}</span>
          </div>
        );
      })}
    </div>
  );
}
