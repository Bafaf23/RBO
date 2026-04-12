import { renderHistory } from "./renderHistory.js";
import { balance } from "./balance.js";

/**
 * Función que agrega una nueva transacción a la lista del usuario
 * @param {object} formData - Debe contener { monto, tipo, cargo, fecha }
 */
export function addTrans(e, formData) {
  e.preventDefault();

  let listaUsuarios = JSON.parse(localStorage.getItem("dataUsers")) || [];

  let sesionActiva = JSON.parse(localStorage.getItem("userSession"));

  if (!formData.fecha || !formData.cargo || isNaN(formData.monto)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // 3. Crear objeto de transacción
  const nuevaTrasn = {
    id: Date.now(),
    monto: formData.monto,
    tipo: formData.tipo,
    cargo: formData.cargo,
    fecha: formData.fecha,
  };

  const index = listaUsuarios.findIndex((u) => u.id === sesionActiva.id);

  if (index !== -1) {
    if (!listaUsuarios[index].trans) listaUsuarios[index].trans = [];

    listaUsuarios[index].trans.push(nuevaTrasn);

    const montoNumerico = parseFloat(formData.monto);
    if (formData.tipo === "ingreso") {
      listaUsuarios[index].saldo =
        (listaUsuarios[index].saldo || 0) + montoNumerico;
    } else {
      listaUsuarios[index].saldo =
        (listaUsuarios[index].saldo || 0) - montoNumerico;
    }

    sesionActiva = listaUsuarios[index];
    localStorage.setItem("dataUsers", JSON.stringify(listaUsuarios));
    localStorage.setItem("userSession", JSON.stringify(sesionActiva));

    balance();
    renderHistory();

    console.log(`Transacción de ${formData.tipo} guardada con éxito`);
  } else {
    console.error("No se encontró el usuario en la base de datos");
  }
}
