"use client";

import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";
export default function Input({ type, placeholder, name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={inputType}
        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        placeholder={placeholder}
      />

      {/* SE CORRIGIÓ: Sintaxis limpia del condicional && de React */}
      {type === "password" && (
        <span
          onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors flex items-center select-none"
          id="mostrarPass"
        >
          <Icon icon={showPassword ? faEyeSlash : faEye} className="text-lg" />
        </span>
      )}
    </div>
  );
}
