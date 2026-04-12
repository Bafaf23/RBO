import { balance } from "./balance.js";
import { renderHistory } from "./renderHistory.js";
/**
 * Elemina de la lista de transaciones una transascion
 * @param {string} id -ID de la transacion
 * @returns {Element} - Historial renderizado
 */
export function deleteTransaction(id) {
  let listaUsuarios = JSON.parse(localStorage.getItem("dataUsers")) || [];
  const dataUsers = JSON.parse(localStorage.getItem("userSession"));

  const transEliminar = dataUsers.trans;
  const transIndex = transEliminar.findIndex((u) => u.id == id);
  const transUser = listaUsuarios.findIndex((u) => u.id === dataUsers.id);

  if (transIndex !== -1) {
    if (dataUsers.trans[transIndex].tipo === `ingreso`) {
      dataUsers.saldo = dataUsers.saldo - dataUsers.trans[transIndex].monto;
    } else if (dataUsers.trans[transIndex].tipo === `egreso`) {
      dataUsers.saldo = dataUsers.saldo + dataUsers.trans[transIndex].monto;
    }

    transEliminar.splice(transIndex, 1);

    listaUsuarios[transUser] = dataUsers;

    localStorage.setItem("userSession", JSON.stringify(dataUsers));
    localStorage.setItem("dataUsers", JSON.stringify(listaUsuarios));

    renderHistory();
    balance();
  } else {
    console.log(`Transaccion no encontrada`);
  }
}
