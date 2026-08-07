"use client";

import Link from "next/link";
import Input from "@/components/atoms/Input";
import Button from "../atoms/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/service/auth/login";

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    pass: "",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.email.trim() || !data.pass.trim()) {
      alert("Ingrese sus credenciales para iniciar sesión");
      return;
    }

    setLoading(true);

    const response = await login(data);

    if (response?.success === true) {
      setLoading(false);
      router.push("/dashboard");
    } else {
      alert(response.message);
      setLoading(false);
    }
  }

  const handlChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-slate-900 uppercase font-extrabold leading-tight">
          Bienvenido
        </h2>
        <p className="text-gray-400 font-bold text-sm">
          Usa tus credenciales para ingresar al sistama
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
            onChange={handlChange}
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
            onChange={handlChange}
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
            Entrar
          </Button>
        </div>

        {/* Enlace de Registro */}
        <p className="text-center text-sm text-slate-500 pt-2">
          ¿No tienes cuenta?{" "}
          {/* SE CORRIGIÓ: Cambiado por componente Link oficial de Next.js */}
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
