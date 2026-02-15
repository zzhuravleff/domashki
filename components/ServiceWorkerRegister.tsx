"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister({
  onUpdate,
}: {
  onUpdate?: () => void;
}) {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.onupdatefound = () => {
        const worker = reg.installing;
        if (!worker) return;

        worker.onstatechange = () => {
          if (
            worker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            onUpdate?.(); // если передали обработчик
          }
        };
      };
    });
  }, []);

  return null;
}
