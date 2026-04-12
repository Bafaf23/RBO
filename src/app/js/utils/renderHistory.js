import { deleteTransaction } from "./deleteTransaction.js";
import { balance } from "./balance.js";
/**
 * Renderiza el histirila de transacionesç
 */
export function renderHistory() {
  const lista = document.getElementById("historial");
  const sesion = JSON.parse(localStorage.getItem("userSession"));

  lista.innerHTML = "";

  if (!sesion || !sesion.trans || sesion.trans.length === 0) {
    lista.innerHTML = `<p class="bg-gray-300 p-5 text-gray-500 rounded-md text-center">No hay movimientos registrados.</p>`;
    return;
  }

  sesion.trans.forEach((item) => {
    const tans = document.createElement("div");

    const tipoTarns = item.tipo == `ingreso`;
    console.log(tipoTarns);

    tans.innerHTML = `
      <div class="flex justify-between items-center p-4 bg-white/70 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm mb-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex justify-center items-center ${
            tipoTarns
              ? "bg-emerald-100 text-emerald-600"
              : "bg-rose-100 text-rose-600"
          }">
            <i class="fa-solid ${
              tipoTarns ? "fa-arrow-down" : "fa-arrow-up"
            }"></i>
          </div>
          
          <div class="flex flex-col">
            <h3 class="font-bold text-slate-800 text-sm capitalize">${
              item.cargo || "Transacción"
            }</h3>
            <span class="text-[11px] text-slate-400 font-medium">${
              item.fecha
            }</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-baseline gap-1 text-right">
            <span class="font-black ${
              tipoTarns ? "text-emerald-500" : "text-rose-500"
            }">
              ${tipoTarns ? "+" : "-"} ${parseFloat(item.monto).toFixed(2)}
            </span>
            <sup class="text-[10px] text-slate-400 font-bold">Bs</sup>
          </div>
          <button class="btn-eliminar text-slate-300 hover:text-rose-500 transition-colors cursor-pointer p-1">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>`;
    lista.appendChild(tans);

    const btnEliminar = tans.querySelector(".btn-eliminar");
    btnEliminar.addEventListener(`click`, () => {
      deleteTransaction(item.id);
    });
  });

  balance();
}
