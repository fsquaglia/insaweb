"use client";
import { useEffect } from "react";

let visitRegistered = false; // Flag a nivel de módulo, fuera del componente

export function VisitTracker() {
  useEffect(() => {
    const key = "site_visited";

    if (visitRegistered) return; // Ya se intentó en este ciclo de vida
    if (sessionStorage.getItem(key)) return; // Ya se registró en esta sesión

    visitRegistered = true; // Marcar antes del fetch para bloquear el segundo montaje

    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      sessionStorage.setItem(key, "1");
    });
  }, []);

  return null;
}
