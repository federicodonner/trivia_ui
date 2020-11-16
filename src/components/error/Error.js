import React from "react";
import "./error.css";

class Error extends React.Component {
  state: {
    userInfo: {},
  };

  navegarAHome = () => (event) => {
    this.props.history.push({
      pathname: "home",
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="app-view cover">
        <div className="scrollable">
          <div className="content">
            <p>
              Algo funcionó mal, te pedimos disculpas. Presiona{" "}
              <span className="negrita" onClick={this.navegarAHome()}>
                aquí
              </span>{" "}
              para volver.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
