
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [cajas, cambiarCajas] = useState([]);

  const direccion = "http://localhost/cajas/api/cajas.php";


  function mostrarCajas() {
    fetch(direccion)
      .then(respuesta => respuesta.json())
      .then(datos => cambiarCajas(datos));
  }

  useEffect(() => {
    mostrarCajas();
  }, []);

  // Agregar una caja
  function agregarCaja() {
    let nombre = prompt("Escribe el nombre de la caja");

    if (nombre == null || nombre == "") {
      return;
    }

    fetch(direccion, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accion: "agregar_caja",
        nombre: nombre
      })
    }).then(() => mostrarCajas());
  }

  // Agregar una nota
  function agregarNota(idCaja) {
    let texto = prompt("Escribe tu nota");

    if (texto == null || texto == "") {
      return;
    }

    fetch(direccion, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accion: "agregar_nota",
        caja_id: idCaja,
        contenido: texto
      })
    }).then(() => mostrarCajas());
  }

  // Borrar una nota
  function borrarNota(idNota) {
    fetch(direccion, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accion: "borrar_nota",
        id: idNota
      })
    }).then(() => mostrarCajas());
  }

  // Borrar una caja
  function borrarCaja(idCaja) {
    let respuesta = confirm("¿Quieres borrar esta caja?");

    if (respuesta == false) {
      return;
    }

    fetch(direccion, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accion: "borrar_caja",
        id: idCaja
      })
    }).then(() => mostrarCajas());
  }

  return (
    <div className="contenedor">

      <h1>Mis cajas digitales</h1>

      <button onClick={agregarCaja}>
        Agregar caja
      </button>

      <div className="cajas">

        {cajas.map(caja => (
          <div className="caja" key={caja.id}>

            <h2>{caja.nombre}</h2>

            {caja.notas.map(nota => (
              <div className="nota" key={nota.id}>

                <p>{nota.contenido}</p>

                <button onClick={() => borrarNota(nota.id)}>
                  Borrar nota
                </button>

              </div>
            ))}

            <button onClick={() => agregarNota(caja.id)}>
              Agregar nota
            </button>

            <button onClick={() => borrarCaja(caja.id)}>
              Borrar caja
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;
