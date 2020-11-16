import React from "react";
import "./juego.css";
import BotonPregunta from "../botonPregunta/BotonPregunta";
import { accederAPI } from "../../utils/fetchFunctions";

class Juego extends React.Component {
  state: {};

  // Función ejecutada cuando la API devuelve los detalles del juego
  callbackGETJuego = (juego) => {
    this.setState({ juego: juego, loader: { encendido: false } });
  };

  // Función ejecutada cuando hubo un error en la API al devolver el juego
  callbackErrorGETJuego = (error) => {
    // Muestra el error al usuario
    alert(error.detail);
    // FALTA NAVEGAR A NOT FOUND
  };

  componentDidMount() {
    // Va a buscar el juego indicado en el hash
    accederAPI(
      "GET",
      "juego/" + this.props.match.params.id,
      null,
      this.callbackGETJuego,
      this.callbackErrorGETJuego
    );
  }

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: { encendido: true } };
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          {this.state && this.state.loader.encendido && (
            <div className="loader-container">
              <p>
                <img className="loader" src="/images/loader.svg" />
              </p>
              <p className={"negrita"}>{this.state.loader.texto}</p>
            </div>
          )}
          {this.state && !this.state.loader.encendido && (
            <>
              <div className="content">
                <div className="cabezalEmpresa">
                  <div className="nombreEmpresa">
                    {this.state.juego.empresa}
                  </div>
                  <div className="taglineJuego">{this.state.juego.tagline}</div>
                </div>
                <div className="containerCategorias">
                  {this.state.juego.categorias.map((categoria) => {
                    return (
                      <div
                        key={categoria.id}
                        className={
                          categoria.count % 2 != 0
                            ? "categoria"
                            : "categoria par"
                        }
                      >
                        <div className="tituloCategoria">
                          {categoria.nombre}
                        </div>
                        <div className="containerBotonesPreguntas">
                          {categoria.preguntas.map((pregunta) => {
                            return (
                              <BotonPregunta
                                key={pregunta.id}
                                pregunta={pregunta}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pieEquipos">
                  <div className="logoLudicamente"></div>

                  {this.state.juego.equipos.map((equipo) => {
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
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Juego;
