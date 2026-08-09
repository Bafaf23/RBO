"use client";

import { useEffect } from "react";
import Backdrop from "@/components/atoms/Backdrop";
import ModalHeader from "../molecule/ModalHeader";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  // Evitar scroll del body cuando la modal está abierta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <Backdrop onClick={onClose} />

      {/* Contenedor Principal de la Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-zinc-200/80 z-10 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
        {/* Cabecera (Molécula) */}
        <div className="p-6 pb-2">
          <ModalHeader title={title} onClose={onClose} />
        </div>

        {/* Cuerpo / Contenido dinámico */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-600 text-sm">
          {children}
        </div>

        {/* Pie de página opcional */}
        {footer && (
          <div className="p-6 pt-4 border-t border-zinc-200 bg-zinc-50/50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
