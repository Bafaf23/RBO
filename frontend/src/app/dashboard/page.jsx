"use client";
import BalanceHeroCard from "@/components/organisms/BalanceHeroCard";
import MonthlyCashFlowCard from "@/components/organisms/MonthlyCashFlowCard";
import StatCard from "@/components/organisms/StatCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSesion } from "@/context/SesionContext";
import { bsPrecio } from "@/service/dolarApi/getBs";

export default function DashboardPage() {
  const router = useRouter();
  const { usuario, cargando } = useSesion();
  const [tasaDolar, setTasaDolar] = useState("");

  useEffect(() => {
    if (!cargando && !usuario) {
      router.push("/login");
    }
  }, [cargando, router, usuario]);

  useEffect(() => {
    async function obtenerTasa() {
      const data = await bsPrecio();
      if (data) {
        setTasaDolar(data);
      }
    }

    if (usuario) {
      obtenerTasa();
    }
  }, [usuario]);

  if (cargando || !usuario) {
    return (
      <div className="min-h-screen bg-zinc-200 flex items-center justify-center">
        <p className="text-slate-600 text-sm font-semibold animate-pulse">
          Cargando sesión...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto p-4 md:p-3">
      {/* 1. Hero Card (Ocupa 2 cols x 2 filas) */}
      <div className="md:col-span-2 md:row-span-2">
        <BalanceHeroCard tasaDolar={tasaDolar.promedio} />
      </div>

      {/* 2. Tarjeta 50% - Necesidades */}
      <div className="md:col-span-1">
        <StatCard
          title="50% - Necesidades"
          amount="$0.00"
          desc="Pagos obligatorios requeridos para tu día a día."
        />
      </div>

      {/* 3. Tarjeta 30% - Deseos / Opcionales */}
      <div className="md:col-span-1">
        <StatCard
          title="30% - Deseos"
          amount="$0.00"
          desc="Gastos opcionales que mejoran tu calidad de vida."
        />
      </div>

      {/* 4. Tarjeta 20% - Ahorro e Inversión */}
      <div className="md:col-span-1">
        <StatCard
          title="20% - Ahorro"
          amount="$0.00"
          desc="Dinero destinado a tu red de seguridad y patrimonio."
        />
      </div>

      {/* 5. Tarjeta adicional para completar el espacio del grid (Celda 4x2) */}
      <div className="md:col-span-1">
        <StatCard
          title="Fondo Emergencia"
          amount="$0.00"
          desc="Meta recomendada: 3 a 6 meses de gastos."
        />
      </div>
      <div className="md:col-span-3">
        <MonthlyCashFlowCard />
      </div>
      <div className="md:col-span-1">
        <StatCard
          title="Precio del Dolar Hoy"
          amount={tasaDolar?.promedio}
          desc="Dolar Oficial BCV."
        />
      </div>
    </div>
  );
}
