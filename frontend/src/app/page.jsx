import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-zinc-200">
      <header
        id="nav"
        className="flex justify-between items-center px-6 py-4 fixed w-full top-0 z-50 transition-colors duration-75 ease-i"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="Logo RBO"
            width={24}
            height={24}
            className="w-10 h-10 rounded-md object-cover"
          />
          <h1
            id="logo-text"
            className="text-xl font-bold tracking-tight text-emerald-600 font-sans"
          >
            Rebus <span className="text-blue-500">Finanzas</span>
          </h1>
        </div>

        {/* Corrección: Enrutamiento nativo a la carpeta app/login/page.js sin usar .html */}
        <Link
          href="/login"
          className="text-sm font-bold bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Acceder
        </Link>
      </header>

      {/*  <!-- hero (sección principal) --> */}
      <section className="w-full h-dvh flex items-center justify-center">
        <div className="relative overflow-hidden scrollbar-none bg-slate-900 shadow-2xl w-full h-full">
          {/*  <!-- Contenedor con scroll suave --> */}
          <div className="flex h-full snap-x snap-mandatory overflow-x-auto no-scrollbar scroll-smooth">
            {/*  <!-- Card 1: Bienvenida --> */}
            <div id="card1" className="min-w-full h-full snap-center relative">
              <Image
                // Corrección: Se limpió el residuo '%22' al final de la URL
                src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                fill
                priority // Carga prioritaria para la primera imagen visible
                alt="Bienvenida"
              />
              <div className="relative h-full flex flex-col justify-end p-8 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent">
                <h1 className="text-3xl font-bold text-white font-sans tracking-tight">
                  ¡Bienvenido a <span className="text-rebus-blue">RBO</span>!
                </h1>
                <p className="text-slate-200 mt-2 text-lg">
                  El paraíso para planificar tus finanzas.
                </p>
                <button className="mt-4 w-fit px-6 py-2 bg-rebus-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                  Ver más
                </button>
              </div>
            </div>

            {/*     <!-- Card 2: Cashless --> */}
            <div id="card2" className="min-w-full h-full snap-center relative">
              <Image
                src="https://walpaper.es/wallpaper/2017/04/imagenes-de-paisajes-relajantes.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                fill
                alt="Cashless"
              />
              <div className="relative h-full flex flex-col justify-end p-8 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent">
                <h1 className="text-3xl font-bold text-white font-sans tracking-tight text-rebus-cyan">
                  Cashless
                </h1>
                <p className="text-slate-200 mt-2 text-lg">
                  Organiza tu ecosistema financiero institucional.
                </p>
                <button className="mt-4 w-fit px-6 py-2 bg-rebus-cyan text-white font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                  Ver más
                </button>
              </div>
            </div>

            {/*  <!-- Card 3: Un solo lugar --> */}
            <div id="card3" className="min-w-full h-full snap-center relative">
              <Image
                src="https://www.kalanobleas.com/wp-content/uploads/2023/11/Ejercicios-de-relajacion-y-meditacion-para-principiantes-2-1.png"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                fill
                alt="Un solo lugar"
              />
              <div className="relative h-full flex flex-col justify-end p-8 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent">
                <h1 className="text-3xl font-bold text-white font-sans tracking-tight text-rebus-cyan">
                  ¡En un solo lugar!
                </h1>
                <p className="text-slate-200 mt-2 text-lg">
                  Mil cuentas, un solo lugar para organizar tus finanzas
                </p>
                <p className="text-slate-200 mt-2 text-sm opacity-80">
                  100% seguro y confiable. No hay nada de qué preocuparse
                </p>
                <button className="mt-4 w-fit px-6 py-2 bg-rebus-cyan text-white font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                  Ver más
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Navegación (Puntos) --> */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <a
              href="#card1"
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-white transition-colors"
              aria-label="Ir a card 1"
            ></a>
            <a
              href="#card2"
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-white transition-colors"
              aria-label="Ir a card 2"
            ></a>
            <a
              href="#card3"
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-white transition-colors"
              aria-label="Ir a card 3"
            ></a>
          </div>
        </div>
      </section>
    </main>
  );
}
