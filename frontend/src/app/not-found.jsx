"use client";

import Icon from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50/50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative mx-auto w-24 h-24 bg-white rounded-[22px] shadow-xl flex items-center justify-center border border-slate-100">
          <Icon icon={faCompass} className="text-4xl text-rose-500" />
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Ruta perdida
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Parece que la transacción o página que buscas no existe en el
            sistema{" "}
            <strong className="font-semibold text-slate-700">RBO</strong>. Tal
            vez fue movida a la versión antigua o eliminada.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Corrección: Enlace corregido a la raíz de Next.js */}
          <Link
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 block text-center"
            href="/"
          >
            Volver al inicio
          </Link>

          <button
            onClick={() => router.back()}
            className="w-full py-4 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-white transition-all active:scale-95 cursor-pointer"
          >
            Regresar a la página anterior
          </button>
        </div>

        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest pt-8">
          RBO Personal Finance System &bull; 2026
        </p>
      </div>
    </div>
  );
}
