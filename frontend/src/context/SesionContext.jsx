// SesionContext.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SesionContext = createContext();

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Al cargar/recargar la página, leemos sessionStorage
    const usuarioGuardado = sessionStorage.getItem("user");
    if (usuarioGuardado) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        sessionStorage.removeItem("user");
      }
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (datosUsuario) => {
    sessionStorage.setItem("user", JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem("user");
    setUsuario(null);
  };

  return (
    <SesionContext.Provider
      value={{ usuario, cargando, iniciarSesion, cerrarSesion }}
    >
      {children}
    </SesionContext.Provider>
  );
}

export const useSesion = () => useContext(SesionContext);
