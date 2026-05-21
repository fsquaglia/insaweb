"use client";
import { useEffect, useState } from "react";
import { RiBarChartLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";

function Analytics() {
  const [stats, setStats] = useState({ totalVisits: 0, lastUpdated: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/track-visit")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);
  const { totalVisits, lastUpdated } = stats;

  const lastUpdatedFormatted = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString("es-ES")
    : "Sin registros";

  return (
    <div className="flex justify-center items-center p-8">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
            <RiBarChartLine className="text-blue-500 text-xl" />
          </div>
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Analytics
          </span>
        </div>

        {/* Métrica principal */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl px-5 py-4 mb-4">
          <p className="text-xs text-zinc-400 mb-1">Visitas totales</p>
          {loading ? (
            <p className="text-xl font-medium text-zinc-400">Comprobando...</p>
          ) : (
            <p className="text-4xl font-medium text-zinc-900 dark:text-white leading-tight">
              {totalVisits.toLocaleString("es-ES")}
            </p>
          )}
        </div>

        {/* Última visita */}
        <div className="flex items-center gap-2 pt-1">
          <RiTimeLine className="text-zinc-400 text-base" />
          <span className="text-xs text-zinc-400">
            Última visita:{" "}
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {lastUpdatedFormatted}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
