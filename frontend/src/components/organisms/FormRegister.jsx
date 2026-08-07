"use client";

import Link from "next/link";
import Input from "@/components/atoms/Input";
import Icon from "../atoms/Icon";
import { faAnchorCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/Button";
import { register } from "@/service/user/register";
import { useState } from "react";

export default function FormRegister() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    pass: "",
    passConfig: "",
  });

  const initialFormState = {
    name: "",
    email: "",
    pass: "",
    passConfig: "",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!formData.email) {
      setLoading(false);
      alert("El correo es necesario");
      return;
    }

    if (formData.passConfig !== formData.pass) {
      setLoading(false);
      alert("Las contrasenas teiene que ser iguales");
      return;
    }

    const response = await register(formData);

    if (response.success === true) {
      alert(response.message);
      setLoading(false);
      setFormData(initialFormState);
    } else {
      setLoading(false);
      alert(response.message);
    }
  }

  const handlChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h2 className="text-2xl text-slate-900 uppercase font-extrabold leading-tight tracking-tight">
          Crea tu cuenta gratis
        </h2>
        <p className="text-slate-400 font-bold text-sm mt-1">
          Empieza a usar la mejor forma de organizarte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fila: Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            {/* SE CORRIGIÓ: htmlFor alineado al id correcto */}
            <label
              htmlFor="regName"
              className="text-sm font-semibold text-slate-600 ml-1"
            >
              Nombre
            </label>
            <Input
              type="text"
              placeholder="Carlos"
              name="name"
              value={formData.name || ""}
              onChange={handlChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* SE CORRIGIÓ: htmlFor alineado al id correcto */}
            <label
              htmlFor="regLastName"
              className="text-sm font-semibold text-slate-600 ml-1"
            >
              Apellido
            </label>
            <Input
              type="text"
              placeholder="Pérez"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handlChange}
            />
          </div>
        </div>

        {/* Campo: Correo Electrónico */}
        <div className="flex flex-col gap-2">
          {/* SE CORRIGIÓ: htmlFor alineado al id correcto */}
          <label
            htmlFor="regEmail"
            className="text-sm font-semibold text-slate-600 ml-1"
          >
            Correo Electrónico
          </label>
          <Input
            type="email"
            placeholder="tucorreo@correo.com"
            name="email"
            value={formData.email || ""}
            onChange={handlChange}
          />
        </div>

        {/* Fila: Contraseñas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            {/* SE CORRIGIÓ: htmlFor alineado al id correcto */}
            <label
              htmlFor="regPass"
              className="text-sm font-semibold text-slate-600 ml-1"
            >
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="******"
              name="pass"
              value={formData.pass || ""}
              onChange={handlChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            {/* SE CORRIGIÓ: htmlFor alineado al id correcto */}
            <label
              htmlFor="regPassRepeat"
              className="text-sm font-semibold text-slate-600 ml-1"
            >
              Repite la contraseña
            </label>
            <Input
              id="regPassRepeat"
              type="password"
              placeholder="******"
              name="passConfig"
              value={formData.passConfig || ""}
              onChange={handlChange}
            />
          </div>
        </div>

        {/* Bloque de Requisitos de Contraseña */}
        <div className="bg-amber-50/80 border border-amber-100 text-sm flex items-start gap-4 rounded-2xl p-4">
          <span className="text-2xl text-amber-600 mt-0.5 shrink-0">
            {/* SE CORRIGIÓ: Renderizado del icono gratuito */}
            <Icon icon={faAnchorCircleCheck} />
          </span>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">
              La contraseña debe tener:
            </p>
            <ul className="text-xs text-amber-800 space-y-0.5 list-disc list-inside">
              <li>
                {" "}
                Un carácter especial{" "}
                <span className="font-mono bg-amber-100 px-1 py-0.5 rounded text-[11px]">
                  !@#$%^&*
                </span>
              </li>
              <li> Una minúscula y una mayúscula</li>
              <li>
                {" "}
                Estructura <span className="font-semibold">alfanumérica</span>
              </li>
              <li>
                {" "}
                Longitud de <span className="font-semibold">8 a 16</span>{" "}
                caracteres
              </li>
            </ul>
          </div>
        </div>

        {/* Botón Registrar */}
        <div className="pt-2">
          <Button
            type="submit"
            color="bg-green-600"
            hover="hover:bg-green-700"
            disabled={loading}
          >
            Guardar datos
          </Button>
        </div>

        {/* Enlace de Retorno */}
        <p className="text-center text-sm text-slate-500 pt-2">
          ¿Tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:underline"
          >
            Iniciar Sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
