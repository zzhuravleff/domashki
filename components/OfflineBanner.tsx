"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner({
  setOffline,
}: { setOffline?: (val: boolean) => void }) {
  const [offline, setOfflineState] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setOfflineState(false);
      setOffline?.(false);
    };
    const handleOffline = () => {
      setOfflineState(true);
      setOffline?.(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOffline]);

  if (!offline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50 shadow-lg">
      Нет подключения к сети. Редактирование недоступно.
    </div>
  );
}
