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
      // Сохраняем объект регистрации для ручного обновления
      setRegistration(reg);

      // Отслеживаем появление нового Service Worker
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.onstatechange = () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            // Новый SW готов → уведомляем клиент
            onUpdate?.();
          }
        };
      };

      // Проверка версии SW через message
      if (reg.active) {
        reg.active.postMessage({ type: "CHECK_VERSION" });
      }

      navigator.serviceWorker.addEventListener("message", (e) => {
        if (e.data?.type === "VERSION") {
          const swVersion = e.data.version;
          // Если версия отличается от текущей, показываем окно обновления
          if (swVersion && swVersion !== localStorage.getItem("swVersion")) {
            localStorage.setItem("swVersion", swVersion);
            onUpdate?.(); // вызываем callback для отображения кнопки обновления
          }
        }
      });
    });
  }, [onUpdate, setRegistration]);

  return null;
}
