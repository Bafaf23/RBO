import { getData } from "../api/dolarApi.js";

const boton = document.getElementById("ingreso");
const lista = document.getElementById("historial");
const saldoDisplay = document.getElementById("saldo");

// 1. Inicializar datos: Leer de LocalStorage o empezar con array vacío
let dataUser = JSON.parse(localStorage.getItem("trasn")) || [];

// 2. Función para renderizar el historial al cargar la página
function renderHistorial() {
  lista.innerHTML = ""; // Limpiar lista antes de dibujar

  let totalAcumulado = 0;

  dataUser.forEach((item) => {
    totalAcumulado += item.monto;
    const tans = document.createElement("div");
    // Usamos clases dinámicas para diferenciar ingresos de egresos si fuera necesario
    tans.innerHTML = `
      <div class="card-historial ingreso" id="row-${item.id}">
        <div class="historial-info">
          <h3>${item.cargo}</h3>
          <span>${item.fecha}</span>
        </div>
        <div class="historial-monto">
          <div>
            <span>${item.monto.toFixed(2)}</span>
          </div>
          <sup>Bs</sup>
          <button onclick="eliminarTransaccion(${
            item.id
          })" style="margin-left:10px; cursor:pointer;">❌</button>
        </div>
      </div>`;
    lista.appendChild(tans);
  });

  // Actualizar el saldo total en pantalla
  saldoDisplay.innerText = totalAcumulado.toFixed(2);

  function actualizarSaldos(totalAcumulado) {
    // 1. Llamamos a la API
    getData("https://ve.dolarapi.com/v1/dolares/oficial")
      .then((data) => {
        // 2. Extraemos el valor numérico (usualmente 'promedio' en esta API)
        const tasa = data.promedio;

        // 3. Ejecutamos la función de mostrar pasándole los datos reales
        calcularYMostrarDolar(tasa, totalAcumulado);
      })
      .catch((error) => {
        console.error("Error al obtener la tasa:", error);
      });
  }
  actualizarSaldos(totalAcumulado);
}

function calcularYMostrarDolar(tasa, totalBs) {
  const displayDolar = document.getElementById("saldoDolar");

  // En finanzas, si quieres saber cuántos Dólares tienes: MontoBs / Tasa
  // Si lo que quieres es multiplicar (ej. Tasa de cambio inversa), usa el asterisco
  let montoDolar = totalBs / tasa;

  if (displayDolar) {
    // .toFixed(2) es vital en 2025 para mostrar formato moneda (ej: 10.50)
    displayDolar.textContent = montoDolar.toFixed(2);
  }
}

// 3. Función para agregar nueva transacción
function agregar() {
  const fecha = document.getElementById("fecha").value;
  const cargo = document.getElementById("cargo").value;
  const montoInput = document.getElementById("monto");

  const monto = parseFloat(montoInput.value);

  // Validación básica
  if (!fecha || !cargo || isNaN(monto)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // Crear objeto de transacción
  const nuevaTrasn = {
    id: Date.now(), // ID único basado en tiempo
    monto: monto,
    cargo: cargo,
    fecha: fecha,
  };

  // Guardar en el array y en LocalStorage
  dataUser.push(nuevaTrasn);
  localStorage.setItem("trasn", JSON.stringify(dataUser));

  // Limpiar campos y refrescar vista
  montoInput.value = "";
  renderHistorial();
}

// 4. Función para eliminar (Reemplaza a tu código con jQuery)
window.eliminarTransaccion = function (id) {
  if (!confirm("¿Eliminar esta transacción?")) return;

  dataUser = dataUser.filter((item) => item.id !== id);
  localStorage.setItem("trasn", JSON.stringify(dataUser));
  renderHistorial();
};

// Eventos e inicio
boton.addEventListener("click", agregar);
renderHistorial(); // Dibujar todo al abrir la página
