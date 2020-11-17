import React from "react";
import "./pregunta.css";
import PieEquipos from "../pieEquipos/PieEquipos";
import { accederAPI } from "../../utils/fetchFunctions";

class Pregunta extends React.Component {
  state: {};

  // Función ejecutada cuando la API devuelve los detalles del juego
  callbackGETPregunta = (pregunta) => {
    this.setState({ pregunta: pregunta, loader: { encendido: false } });
  };

  // Función ejecutada cuando hubo un error en la API al devolver el juego
  callbackErrorGETPregunta = (error) => {
    // Muestra el error al usuario
    alert(error.detail);
    this.volverAPreguntas();
  };

  mostrarRespuesta = () => {
    this.setState({ mostrarRespuesta: true });
  };

  callbackPUTRespuesta = () => {
    this.volverAPreguntas();
  };

  callbackErrorPUTRespuesta = (error) => {
    alert(error.detail);
    this.volverAPreguntas();
  };

  marcarRespuesta = (respuestaCorrecta) => (event) => {
    event.preventDefault();
    this.setState({
      loader: { encendido: true, texto: "Ingresando respuesta" },
    });
    accederAPI(
      "PUT",
      "respuesta/" + this.state.pregunta.hash,
      { respuesta_correcta: respuestaCorrecta },
      this.callbackPUTRespuesta,
      this.callbackErrorPUTRespuesta
    );
  };

  volverAPreguntas = () => {
    this.props.history.push({ pathname: "/" + this.state.pregunta.juego_hash });
  };

  componentDidMount() {
    // Va a buscar la pregunta indicada en el hash
    accederAPI(
      "GET",
      "preguntahash/" + this.props.match.params.id,
      null,
      this.callbackGETPregunta,
      this.callbackErrorGETPregunta
    );
  }

  // prende el loader antes de cargar el componente
  constructor(props) {
    super(props);
    this.state = { loader: { encendido: true, texto: "Cargando pregunta" } };
  }

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          {this.state && this.state.loader.encendido && (
            <div className="loader-container">
              <img className="loader" src="/images/cerebroLudicamente.png" />
              <p>{this.state.loader.texto}</p>
            </div>
          )}
          {this.state && !this.state.loader.encendido && (
            <>
              <div className="content">
                <div className="cabezalPregunta">
                  <div className="categoriaPregunta">
                    {this.state.pregunta.categoria_nombre} x{" "}
                    {this.state.pregunta.puntaje} puntos
                  </div>
                </div>
                <div className="containerPregunta">
                  <div className="textoPregunta">
                    {this.state.pregunta.texto}
                  </div>
                  {(this.state.mostrarRespuesta ||
                    this.state.pregunta.respondida) && (
                    <div className="textoPregunta">
                      {this.state.pregunta.respuesta}
                    </div>
                  )}
                  {!this.state.pregunta.respondida && (
                    <div
                      onClick={this.mostrarRespuesta}
                      className="botonMostrarRespuesta"
                    >
                      <span className="block">MOSTRAR</span> RESPUESTA
                    </div>
                  )}
                  {this.state.pregunta.respondida && (
                    <div
                      onClick={this.volverAPreguntas}
                      className="botonMostrarRespuesta"
                    >
                      <span className="block">VOLVER A</span> PREGUNTAS
                    </div>
                  )}
                  {this.state.mostrarRespuesta && (
                    <div className="botonesRespuesta">
                      <div
                        onClick={this.marcarRespuesta(1)}
                        className="botonRespuesta correcta"
                      ></div>
                      <div
                        onClick={this.marcarRespuesta(0)}
                        className="botonRespuesta incorrecta"
                      ></div>
                    </div>
                  )}
                </div>
                <PieEquipos equipos={this.state.pregunta.equipos} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Pregunta;
