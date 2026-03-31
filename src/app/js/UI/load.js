/**
 * Controla la transición de salida del loader y entrada del contenido
 *
 * @returns {void}
 * Manipulacion del DOM
 */
export function load() {
  const loader = document.getElementById("loader");
  const appContent = document.getElementById("appContent");

  if (!loader || !appContent) return;

  loader.classList.add("opacity-0");
  appContent.classList.remove("invisible");

  setTimeout(() => {
    loader.remove();
  }, 500);
}
load();
