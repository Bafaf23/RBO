"use client";

import { useState } from "react";
import InputLabel from "../molecule/InputLabel";

export default function FormIngreso({ formRef, onSubmit, tasaDolar = 0 }) {
  const [formData, setFormData] = useState({
    title: "",
    amountUsd: "",
    category: "sueldo",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amountUsd) return;

    if (onSubmit) {
      onSubmit({
        ...formData,
        amountUsd: parseFloat(formData.amountUsd),
        type: "ingreso",
      });
    }
  };

  const montoBs = (
    parseFloat(formData.amountUsd || 0) * (tasaDolar || 0)
  ).toFixed(2);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {/* Descripción / Concepto del Ingreso */}
      <InputLabel
        id="title"
        name="title"
        label="Descripción del ingreso"
        placeholder="Ej. Pago de nómina, Proyecto Freelance, Venta"
        data={formData.title}
        handleChange={handleChange}
        required
      />

      {/* Monto en USD y Referencia automática en Bs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
        <div>
          <InputLabel
            id="amountUsd"
            name="amountUsd"
            label="Monto ($ USD)"
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0.01"
            data={formData.amountUsd}
            handleChange={handleChange}
            required
          />
        </div>

        {/* Indicador de Tasa / Cálculo de Bs */}
        <div className="bg-zinc-100 border border-zinc-200/80 rounded-2xl p-3 h-[46px] flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase">
            Ref. Bs:
          </span>
          <span className="text-sm font-extrabold text-emerald-700">
            Bs.{" "}
            {Number(montoBs).toLocaleString("es-VE", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* Categoría y Fecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Categoría / Fuente
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-200 rounded-2xl p-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="sueldo">Sueldo / Nómina</option>
            <option value="freelance">Freelance / Servicios</option>
            <option value="inversion">Inversión / Rendimientos</option>
            <option value="otro">Otro Ingreso</option>
          </select>
        </div>

        <div>
          <InputLabel
            id="date"
            name="date"
            label="Fecha de recepción"
            type="date"
            data={formData.date}
            handleChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}
