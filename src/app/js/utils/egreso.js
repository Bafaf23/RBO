import { alertaZen } from "../SweetAlert/alert.js";
import { renderHistorial, saldo } from "./ingreso.js";

const btnModal = document.getElementById("openModalEgreso");
const btnModalMovil = document.getElementById("openModalEgresoMovil");
const modal = document.getElementById("miModalEgreso");
const btnCloseModal = modal.querySelector(".close-btn");

btnModal.addEventListener(`click`, () => {
  modal.style.display = `flex`;
});

btnModalMovil.addEventListener(`click`, () => {
  modal.style.display = `flex`;
});

btnCloseModal.addEventListener(`click`, () => {
  modal.style.display = `none`;
});

//cierra la modal a escuchar un click fuera de la caja
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = `none`;
  }
};

/* --------------------------------------------------------------------------------------- */
// logica de eregresos

const btnEgreso = document.getElementById("egreso");

function agregarEgreso(e) {
  e.preventDefault();
  const montoInput = document.getElementById("montoEgreso");
  const fecha = document.getElementById("fechaEgreso").value;
  const cargo = document.getElementById("cargoEgreso").value;
  const monto = parseFloat(montoInput.value);

  // 1. Obtener la lista de usuarios del localStorage (El Array)
  let listaUsuarios = JSON.parse(localStorage.getItem("dataUsers")) || [];

  // 2. Obtener el usuario actual de la sesión (El Objeto)
  let sesionActiva = JSON.parse(localStorage.getItem("userSession"));

  if (!fecha || !cargo || isNaN(monto))
    return alertaZen(`Erro`, `Llena los campos correctamente`);

  const newEgreso = {
    id: Date.now(),
    monto: monto,
    tipo: `egreso`,
    cargo: cargo,
    fecha: fecha,
  };

  const userIndex = listaUsuarios.findIndex((u) => u.id === sesionActiva.id);

  if (userIndex !== -1) {
    listaUsuarios[userIndex].trans.push(newEgreso);
    listaUsuarios[userIndex].saldo =
      (listaUsuarios[userIndex].saldo || 0) - monto;

    sesionActiva = listaUsuarios[userIndex];

    // 8. GUARDAR AMBOS: El array completo y la sesión actual
    localStorage.setItem("dataUsers", JSON.stringify(listaUsuarios)); // Mantiene el array
    localStorage.setItem("userSession", JSON.stringify(sesionActiva)); // Mantiene el objeto

    renderHistorial();
    saldo();
  }
}

btnEgreso.addEventListener(`click`, agregarEgreso);
