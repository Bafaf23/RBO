/**
 * Notification of style IOS
 *
 * @param {string} mensaje
 * @param {string} titulo
 * @param {string} [tipo="exito"] - exito, error, info
 *
 * @returns {Node}
 *
 */
export function showIOSNotification(titulo, mensaje, tipo = "exito") {
  const container = document.getElementById("notification-container");

  const notif = document.createElement("div");
  notif.className = `
        ios-notif pointer-events-auto w-80 p-4 
        bg-white/70 backdrop-blur-lg border border-white/20 
        rounded-[22px] shadow-2xl flex items-center gap-4 
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
        translate-x-[120%] opacity-0
    `;

  const config = {
    exito: { icon: "fa-check", bg: "bg-emerald-500", text: "text-emerald-500" },
    error: { icon: "fa-xmark", bg: "bg-rose-500", text: "text-rose-500" },
    info: { icon: "fa-info", bg: "bg-blue-500", text: "text-blue-500" },
  };

  const c = config[tipo] || config.info;

  notif.innerHTML = `
        <div class="w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <i class="fa-solid ${c.icon} text-white text-lg"></i>
        </div>
        <div class="flex flex-col overflow-hidden">
            <h4 class="text-slate-900 font-bold text-sm leading-tight">${titulo}</h4>
            <p class="text-slate-500 text-xs leading-snug truncate">${mensaje}</p>
        </div>
    `;

  container.appendChild(notif);

  setTimeout(() => {
    notif.classList.remove("translate-x-[120%]", "opacity-0");
  }, 10);

  setTimeout(() => {
    notif.classList.add("translate-x-[120%]", "opacity-0");
    setTimeout(() => notif.remove(), 600);
  }, 4000);
}
