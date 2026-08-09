"use client";

import Link from "next/link";
import Input from "@/components/atoms/Input";
import Button from "../atoms/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/service/auth/login";
import { useSesion } from "@/context/SesionContext";

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  // 1. Extraemos iniciarSesion del contexto
  const { usuario, cargando, iniciarSesion } = useSesion();
  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (usuario && !cargando) {
      router.push("/dashboard");
    }
  }, [cargando, router, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.email.trim() || !data.pass.trim()) {
      alert("Ingrese sus credenciales para iniciar sesión");
      return;
    }

    setLoading(true);

    try {
      const response = await login(data);

      if (response?.success === true) {
        // Extraemos los datos del usuario (o la respuesta limpia)
        const userData = response.data || response.user || response;

        // 2. Actualizamos el estado global en React (esto guarda en sessionStorage y actualiza usuario)
        if (typeof iniciarSesion === "function") {
          iniciarSesion(userData);
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }

        setLoading(false);
        // 3. Redirigimos teniendo ya el estado 'usuario' activo
        router.push("/dashboard");
      } else {
        alert(response?.message || "Ocurrió un error al iniciar sesión");
        setLoading(false);
      }
    } catch (error) {
      alert("Error de conexión al servidor");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-slate-900 uppercase font-extrabold leading-tight">
          Bienvenido
        </h2>
        <p className="text-gray-400 font-bold text-sm">
          Usa tus credenciales para ingresar al sistema
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Usuario */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="UserEmail"
            className="text-sm font-semibold text-slate-600 ml-1"
          >
            Usuario
          </label>
          <Input
            id="UserEmail"
            onChange={handleChange}
            type="email"
            name="email"
            value={data.email || ""}
            placeholder="correo@ejemplo.com"
          />
        </div>

        {/* Input Contraseña */}
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="pasUser"
            className="text-sm font-semibold text-slate-600 ml-1"
          >
            Contraseña
          </label>
          <Input
            id="pasUser"
            onChange={handleChange}
            value={data.pass || ""}
            name="pass"
            type="password"
            placeholder="********"
          />
        </div>

        {/* Botón Entrar */}
        <div className="pt-2">
          <Button
            type="submit"
            color="bg-blue-600"
            hover="hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </div>

        {/* Enlace de Registro */}
        <p className="text-center text-sm text-slate-500 pt-2">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-bold text-blue-600 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}
