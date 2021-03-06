// Guarda datos en LS
export function guardarEnLS(key, datosGuardar) {
  localStorage.setItem(key, datosGuardar);
}

// Lee desde LS
export function leerDesdeLS(key) {
  return localStorage.getItem(key);
}

// Borra el resgistro de LS
export function borrarDesdeLS(key) {
  return localStorage.removeItem(key);
}

// Función genérica para acceder a la API
export function accederAPI(
  verbo,
  endpoint,
  data,
  callbackExito,
  callbackFallo
) {
  const url = process.env.REACT_APP_API_URL + "/" + endpoint;
  var fetchConfig = {
    method: verbo,
    headers: {
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate",
    },
  };
  if (data) {
    fetchConfig.body = JSON.stringify(data);
  }
  var promise = Promise.race([
    // Genera dos promesas, una con el fetch y otra con el timeout
    // la que termine primero resuelve
    fetch(url, fetchConfig),
    new Promise(function (resolve, reject) {
      setTimeout(
        () => reject(new Error("request timeout")),
        process.env.REACT_APP_API_TIMEOUT
      );
    }),
  ])
    .then((respuesta) => {
      // Cuando se resuelve el race, verifica el status de la respuesta de la API
      // Si es 200 o 201, fue exitoso, entonces ejecuta el callback de éxito
      if (respuesta.status >= 200 && respuesta.status < 300) {
        respuesta.json().then((datos) => {
          callbackExito(datos);
        });
      } else {
        respuesta.json().then((datos) => {
          datos.status = respuesta.status;
          callbackFallo(datos);
        });
      }
    })
    .catch((e) => {
      var respuesta = {
        status: 500,
        detail:
          "Ocurrió un error inesperado, por favor inéntalo denuevo más tarde.",
      };
      callbackFallo(respuesta);
    });
}
