import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: "Bienvenido",
  description: "Panel principal de control financiero",
};

function obtenerSaludo() {
  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12) {
    return "Buenos días";
  } else if (hora >= 12 && hora < 19) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
}

export default function DashboardLayout({ children }) {
  const saludo = obtenerSaludo();
  const user = "Bryant";
  return (
    <div className="min-h-screen bg-zinc-200 text-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-blue-600">
            {saludo},{" "}
            <span className="text-zinc-950">{user?.name || "Bryant"}</span>
          </h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
