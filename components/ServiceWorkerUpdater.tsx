"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

export default function ServiceWorkerUpdater() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            setWaitingWorker(newWorker);
            setUpdateAvailable(true);
          }
        });
      });
    });

    // слушаем message от SW, на будущее можно расширить
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }, []);

  const handleUpdate = () => {
    if (!waitingWorker) return;
    waitingWorker.postMessage("skipWaiting");
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg flex gap-2 items-center z-50">
      <span className="text-sm font-medium">Доступна новая версия!</span>
      <Button size="sm" radius="full" color="primary" onPress={handleUpdate}>
        Обновить
      </Button>
    </div>
  );
}
