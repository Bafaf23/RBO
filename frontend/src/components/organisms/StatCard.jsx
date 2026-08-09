import Icon from "../atoms/Icon";

export default function StatCard({
  title,
  amount,
  amountBs = null,
  desc,
  icon,
  trendPositive,
}) {
  return (
    <div className="h-full bg-zinc-100 border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-zinc-300 transition-colors">
      {/* Cabecera de la tarjeta: Título e Ícono opcional */}
      <div className="flex justify-between items-center gap-2">
        <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
          {title}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-zinc-200/60 flex items-center justify-center text-slate-600 text-sm shrink-0">
            <Icon icon={icon} />
          </div>
        )}
      </div>

      {/* Bloque del Monto y Descripción */}
      <div className="mt-4">
        <div className="flex items-baseline flex-wrap gap-x-2">
          <h4 className="text-3xl font-black text-blue-900 tracking-tight">
            {amount}
          </h4>
          {amountBs && (
            <span className="text-sm font-bold text-slate-500">
              / Bs. {amountBs}
            </span>
          )}
        </div>

        {desc && (
          <span
            className={`text-xs font-semibold mt-1 block ${
              trendPositive === true
                ? "text-emerald-700"
                : trendPositive === false
                  ? "text-rose-600"
                  : "text-slate-500"
            }`}
          >
            {desc}
          </span>
        )}
      </div>
    </div>
  );
}
