import React from "react";
import "./botonPregunta.css";

class BotonPregunta extends React.Component {
  state: {};

  onMouseEnterPregunta = (event) => {
    this.setState({ rollover: true });
  };

  onMouseLeavePregunta = (event) => {
    this.setState({ rollover: false });
  };

  navegarAPregunta = () => {
    this.props.navegarAPregunta(this.props.pregunta.hash);
  };

  componentDidMount() {
    this.setState({ rollover: false });
  }

  render() {
    return (
      <>
        {this.state && (
          <div
            className={
              this.props.pregunta.respondida
                ? "botonPregunta respondida"
                : this.state.rollover
                ? "botonPregunta rollover"
                : "botonPregunta"
            }
            onMouseEnter={this.onMouseEnterPregunta}
            onMouseLeave={this.onMouseLeavePregunta}
            onClick={this.navegarAPregunta}
          >
            <span> {this.props.pregunta.puntaje}</span>
          </div>
        )}
      </>
    );
  }
}

export default BotonPregunta;
