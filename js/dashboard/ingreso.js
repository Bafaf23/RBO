import { getData } from "../api/dolarApi.js";

const boton = document.getElementById("ingreso");
const saldoDisplay = document.getElementById("saldo");

const dataUsers = JSON.parse(localStorage.getItem("userSession"));

saldoDisplay.textContent = dataUsers.saldo.toFixed(2);

// 2. Función para renderizar el historial al cargar la página
function renderHistorial() {
  const lista = document.getElementById("historial");
  const sesion = JSON.parse(localStorage.getItem("userSession"));

  console.log("Datos de sesión:", sesion); // <--- ¡Añade esto!
  console.log("Transacciones a dibujar:", sesion?.trans); // <--- ¡Y esto!

  lista.innerHTML = ""; // Limpiar lista antes de dibujar

  if (!sesion || !sesion.trans || sesion.trans.length === 0) {
    lista.innerHTML = `<p style="text-align:center; padding:20px; color:gray;">No hay movimientos registrados.</p>`;
    return;
  }

  sesion.trans.forEach((item) => {
    const tans = document.createElement("div");

    // Determinar clase si es ingreso o egreso (opcional)
    const tipoClase = item.monto >= 0 ? "ingreso" : "egreso";

    tans.innerHTML = `
      <div class="card-historial ${tipoClase}" id="row-${item.id}">
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
          })" class="btn-eliminar">❌</button>
        </div>
      </div>`;
    lista.appendChild(tans);
  });
}

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
actualizarSaldos(dataUsers.saldo);

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

  // 1. Obtener la lista de usuarios del localStorage (El Array)
  let listaUsuarios = JSON.parse(localStorage.getItem("dataUsers")) || [];

  // 2. Obtener el usuario actual de la sesión (El Objeto)
  let sesionActiva = JSON.parse(localStorage.getItem("userSession"));

  // Validación básica
  if (!fecha || !cargo || isNaN(monto)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // 3. Crear objeto de transacción
  const nuevaTrasn = {
    id: Date.now(),
    monto: monto,
    cargo: cargo,
    fecha: fecha,
  };

  // 4. Buscar al usuario dentro del array global por su ID
  const index = listaUsuarios.findIndex((u) => u.id === sesionActiva.id);

  if (index !== -1) {
    // 5. Inicializar transacciones si no existen
    if (!listaUsuarios[index].trans) listaUsuarios[index].trans = [];

    // 6. Actualizar datos en el array global
    listaUsuarios[index].trans.push(nuevaTrasn);
    listaUsuarios[index].saldo = (listaUsuarios[index].saldo || 0) + monto;

    // 7. Sincronizar también el objeto de sesión (para que la UI se vea bien)
    sesionActiva = listaUsuarios[index];

    // 8. GUARDAR AMBOS: El array completo y la sesión actual
    localStorage.setItem("dataUsers", JSON.stringify(listaUsuarios)); // Mantiene el array
    localStorage.setItem("userSession", JSON.stringify(sesionActiva)); // Mantiene el objeto

    console.log("Transacción guardada con éxito");
  } else {
    console.error("No se encontró el usuario en la base de datos");
  }

  // Limpiar campos y refrescar vista
  montoInput.value = "";
  renderHistorial();
}

// 4. Función para eliminar (Reemplaza a tu código con jQuery)
/* window.eliminarTransaccion = function (id) {
  if (!confirm("¿Eliminar esta transacción?")) return;

  dataUsers = dataUsers.filter((item) => item.id !== id);
  localStorage.setItem("trasn", JSON.stringify(dataUser));
  renderHistorial();
}; */

// Eventos e inicio
boton.addEventListener("click", agregar);
renderHistorial(); // Dibujar todo al abrir la página
