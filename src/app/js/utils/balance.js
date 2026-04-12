
/**
 * Funcion que lee el salado del cleinte
 */
export function balance() {
  const sesion = JSON.parse(localStorage.getItem("userSession"));
  const saldoDisplay = document.getElementById("saldo");

  if (sesion && saldoDisplay) {
    saldoDisplay.textContent = sesion.saldo.toFixed(2);
  }
}
