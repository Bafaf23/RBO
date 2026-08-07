"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// SE OPTIMIZÓ: Sacamos el arreglo del componente para que no se recree en cada render
const BACKGROUNDS = [
  "https://lagranaldea.com/wp-content/uploads/2021/04/21-04-2021-CCS.jpg",
  "https://images.unsplash.com/photo-1714594923299-e915b7d71701?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyYWNhc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.pexels.com/photos/4148187/pexels-photo-4148187.jpeg?cs=srgb&dl=pexels-walcouyi-4148187.jpg&fm=jpg",
  "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww",
  "https://walpaper.es/wallpaper/2017/04/imagenes-de-paisajes-relajantes.jpg",
];

// SE CORRIGIÓ: Nombre cambiado a Mayúscula (AuthLayout) para eliminar las alertas de ESLint
export default function AuthLayout({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(randomIndex);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BACKGROUNDS.length);
    }, 20000); // Cambio exacto cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-900">
      {/* COLUMNA IZQUIERDA: Fotos de Caracas con transición (Oculta en móviles) */}
      <div className="relative hidden md:block w-full h-full overflow-hidden">
        {BACKGROUNDS.map((url, index) => (
          <div
            key={url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <Image
              src={url}
              fill
              priority
              className="object-cover"
              alt={`Fondo dinámico RBO ${index + 1}`}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Filtro oscuro encima de las fotos */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs w-full h-full z-10 pointer-events-none" />

        {/* Texto inferior flotante */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white bg-linear-to-t from-slate-950/80 via-transparent">
          <h2 className="text-3xl font-black tracking-tight">RBO Finanzas</h2>
          <p className="text-slate-300 text-sm mt-2">
            Simplifica la administración de tus activos e ingresos desde un solo
            lugar.
          </p>
        </div>
      </div>

      <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 bg-slate-50">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
