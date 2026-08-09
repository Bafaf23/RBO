"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Mar", ingresos: 1200, egresos: 850, deuda: 100 },
  { mes: "Abr", ingresos: 1400, egresos: 920, deuda: 1000 },
  { mes: "May", ingresos: 1100, egresos: 980, deuda: 1000 },
  { mes: "Jun", ingresos: 1500, egresos: 1050, deuda: 1800 },
  { mes: "Jul", ingresos: 1350, egresos: 800, deuda: 1080 },
  { mes: "Ago", ingresos: 1600, egresos: 950, deuda: 180 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-zinc-200 p-3 rounded-2xl shadow-md text-xs space-y-1">
        <p className="font-bold text-slate-800 border-b border-zinc-100 pb-1 mb-1">
          {label}
        </p>
        <p className="text-emerald-600 font-semibold flex justify-between gap-4">
          <span>Ingresos:</span>
          <span>${payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-rose-500 font-semibold flex justify-between gap-4">
          <span>Egresos:</span>
          <span>${payload[1].value.toLocaleString()}</span>
        </p>
        <p className="text-orange-500 font-semibold flex justify-between gap-4">
          <span>Deuda:</span>
          <span>${payload[2].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MonthlyCashFlowCard() {
  return (
    <div className="h-full bg-zinc-100 border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
      {/* Encabezado e Indicador visual */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
            Flujo Mensual
          </span>
          <h3 className="text-sm font-semibold text-slate-700 mt-0.5">
            Ingresos, Egresos y Deuda
          </h3>
        </div>

        {/* Leyenda superior compacta */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Ingresos
          </div>
          <div className="flex items-center gap-1.5 text-rose-500">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Egresos
          </div>
          <div className="flex items-center gap-1.5 text-orange-500">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            Deuda
          </div>
        </div>
      </div>

      {/* Área del Gráfico */}
      <div className="w-full h-36 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
            <Bar
              dataKey="ingresos"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey="egresos"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey="deuda"
              fill="#FFA500"
              radius={[6, 6, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center border-t border-zinc-200/80 pt-3 text-xs">
        <span className="text-slate-500 font-medium">Balance último mes:</span>
        <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
          +$650.00
        </span>
      </div>
    </div>
  );
}
