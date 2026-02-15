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

  // высота плашки
  const bannerHeight = 40;

  return (
    <>
      {offline && (
        <div
          className="w-full bg-red-500/60 text-white text-center p-2 shadow-lg fixed top-0 z-20 backdrop-blur-2xl"
          style={{ height: bannerHeight, lineHeight: `${bannerHeight}px` }}
        >
          Нет подключения к сети. Редактирование недоступно.
        </div>
      )}

      {/* чтобы контент смещался вниз */}
      <div style={{ height: offline ? bannerHeight : 0 }} />
    </>
  );
}
