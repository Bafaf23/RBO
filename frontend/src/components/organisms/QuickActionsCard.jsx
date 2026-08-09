"use client";

import { useState, useRef } from "react";
import Icon from "../atoms/Icon";
import {
  faArrowUpRightFromSquare,
  faFingerprint,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/organisms/Modal";
import FormIngreso from "./FormIngreso";
// Importa también los demás formularios cuando los tengas listos
// import FormGasto from "./FormGasto";
// import FormDeuda from "./FormDeuda";

import { create } from "@/service/transaction/create";

export default function QuickActionsCard({ tasaDolar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Referencia para accionar el submit desde el botón del footer del Modal
  const formRef = useRef(null);

  const handleOpenModal = (tipo) => {
    setTipoModal(tipo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isLoading) return;
    setIsModalOpen(false);
  };

  // Función que procesa los datos del formulario e invoca la API
  const handleSubmitForm = async (formData) => {
    try {
      setIsLoading(true);
      const respose = await create(formData);
      if (respose.success === true) {
        alert(respose.message);
        setIsModalOpen(false);
      } else {
        alert(respose.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      // Opcional: Notificar error al usuario vía toast o banner
    } finally {
      setIsLoading(false);
    }
  };

  const accionesRapidas = [
    {
      label: "Gastos",
      icon: faArrowUpRightFromSquare,
      color: "text-blue-600",
      onClick: () => handleOpenModal("Registrar Gasto"),
    },
    {
      label: "Ingreso",
      icon: faFingerprint,
      color: "text-emerald-600",
      onClick: () => handleOpenModal("Registrar Ingreso"),
    },
    {
      label: "Deuda",
      icon: faPlus,
      color: "text-amber-600",
      onClick: () => handleOpenModal("Registrar Deuda"),
    },
  ];

  return (
    <div className="flex flex-col justify-between">
      <div className="grid grid-cols-3 gap-3 mt-2">
        {accionesRapidas.map((act, i) => (
          <button
            onClick={act.onClick}
            key={i}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            <Icon icon={act.icon} className={`text-xl ${act.color}`} />
            <span className="text-xs font-semibold text-slate-700">
              {act.label}
            </span>
          </button>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={tipoModal}
        footer={
          <>
            <button
              onClick={handleCloseModal}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-zinc-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => formRef.current?.requestSubmit()}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </>
        }
      >
        {tipoModal === "Registrar Ingreso" && (
          <FormIngreso
            formRef={formRef}
            tasaDolar={tasaDolar}
            onSubmit={handleSubmitForm}
          />
        )}

        {/* 
        {tipoModal === "Registrar Gasto" && (
          <FormGasto
            formRef={formRef}
            tasaDolar={tasaDolar}
            onSubmit={handleSubmitForm}
          />
        )}

        {tipoModal === "Registrar Deuda" && (
          <FormDeuda
            formRef={formRef}
            tasaDolar={tasaDolar}
            onSubmit={handleSubmitForm}
          />
        )} 
        */}
      </Modal>
    </div>
  );
}
