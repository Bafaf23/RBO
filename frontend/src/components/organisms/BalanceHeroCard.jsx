import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";
import QuickActionsCard from "@/components/organisms/QuickActionsCard";

export default function BalanceHeroCard({
  balanceUsd = 0,
  tasaDolar = 0,
  ingresos = 0,
  gastos = 0,
  deudas = 0,
}) {
  const balanceBs = balanceUsd * (tasaDolar || 0);

  const formatearUSD = (monto) =>
    `$${Number(monto).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatearVES = (monto) =>
    `Bs. ${Number(monto).toLocaleString("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="h-full bg-zinc-100 border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:border-zinc-300 transition-colors">
      {/* Luz ambiental decorativa */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Bloque superior: Saldo Total y Conversión a Bolívares */}
      <div className="flex justify-between items-start z-10 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
            Total Disponible
          </span>
          <div className="flex items-baseline gap-2 flex-wrap mt-1">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 tracking-tight">
              {formatearUSD(balanceUsd)}
            </h2>
            {tasaDolar > 0 && (
              <span className="text-sm md:text-base font-bold text-slate-500">
                / {formatearVES(balanceBs)}
              </span>
            )}
          </div>
        </div>

        <button
          className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          title="Tasa actualizada de Dólar BCV"
        >
          <Icon icon={faInfoCircle} />
        </button>
      </div>

      {/* Bloque intermedio: Métricas rápidas (Ingresos, Gastos, Deudas) */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 z-10 mb-6">
        <div className="bg-white/80 border border-zinc-200 rounded-2xl p-3 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Ingresos
          </span>
          <span className="text-sm md:text-base font-extrabold text-zinc-900 mt-1">
            {formatearUSD(ingresos)}
          </span>
        </div>

        <div className="bg-white/80 border border-zinc-200 rounded-2xl p-3 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] md:text-xs font-bold text-rose-600 uppercase tracking-wider">
            Gastos
          </span>
          <span className="text-sm md:text-base font-extrabold text-zinc-900 mt-1">
            {formatearUSD(gastos)}
          </span>
        </div>

        <div className="bg-white/80 border border-zinc-200 rounded-2xl p-3 flex flex-col justify-between shadow-2xs">
          <span className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-wider">
            Deudas
          </span>
          <span className="text-sm md:text-base font-extrabold text-zinc-900 mt-1">
            {formatearUSD(deudas)}
          </span>
        </div>
      </div>

      {/* Bloque inferior: Acciones Rápidas */}
      <div className="z-10 pt-4 border-t border-zinc-300/70">
        <QuickActionsCard tasaDolar={tasaDolar} />
      </div>
    </div>
  );
}
