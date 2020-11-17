import React from "react";
import "./pieEquipos.css";
import BotonPregunta from "../botonPregunta/BotonPregunta";
import { accederAPI } from "../../utils/fetchFunctions";

class PieEquipos extends React.Component {
  state: {};

  componentDidMount() {}

  render() {
    return (
      <div className="pieEquipos">
        <div className="logoLudicamente"></div>

        {this.props.equipos.map((equipo) => {
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
}

export default PieEquipos;
