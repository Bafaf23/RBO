import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";

export default function BalanceHeroCard() {
  return (
    <div className="h-full bg-zinc-100 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-900 font-semibold">
            Total Disponible
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-blue-900 tracking-tight">
            $12,450.80
          </h2>
        </div>
        <Icon icon={faInfoCircle} className="text-slate-400" />
      </div>

      <div className="z-10 space-y-4 pt-6">
        <div className="grid grid-cols-2 gap-4 border-t border-slate-300 pt-4">
          <div>
            <p className="text-xs text-slate-900">Cuenta Corriente</p>
            <p className="text-lg font-bold text-orange-700">$8,210.30</p>
          </div>
          <div>
            <p className="text-xs text-slate-9000">Ahorros</p>
            <p className="text-lg font-bold text-green-700">$4,240.50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
