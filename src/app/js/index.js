import { load } from "./UI/load.js";
import { backdropDinamic } from "./UI/backgroundDinamic.js";
import { balance } from "./utils/balance.js";
import { renderHistory } from "./utils/renderHistory.js";

// Funtion UI
window.addEventListener(`load`, () => {
  load();

  const path = window.location.pathname;

  if (path.includes("dashboard.html")) {
    balance();
    renderHistory();
  } else if (
    path.includes("login.html") ||
    path === "/" ||
    path.includes("register.html")
  ) {
    console.log("Cargando fondo dinámico...");
    backdropDinamic();
  }
});
