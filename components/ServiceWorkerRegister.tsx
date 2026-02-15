"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister({
  onUpdate,
  setRegistration,
}: {
  onUpdate?: () => void;
  setRegistration: (reg: ServiceWorkerRegistration) => void;
}) {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      setRegistration(reg); // сохраняем объект для ручного обновления

      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.onstatechange = () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            onUpdate?.();
          }
        };
      };
    });
  }, [onUpdate, setRegistration]);

  return null;
}
