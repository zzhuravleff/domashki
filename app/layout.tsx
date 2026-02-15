"use client";

import { useState } from "react";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { Button } from "@heroui/button";
import { Inter } from 'next/font/google';
import "../styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [swRegistration, setSWRegistration] = useState<ServiceWorkerRegistration | null>(null);

  return (
    <html lang="ru" className={inter.className}>
      <body>
        {children}

        {/* Модальное окно обновления */}
        {updateAvailable && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4 max-w-xs">
              <p className="text-center font-medium text-lg">
                Доступно обновление приложения
              </p>
              <Button
                color="primary"
                onPress={() => {
                  if (swRegistration?.waiting) {
                    swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
                    window.location.reload();
                  }
                }}
              >
                Обновить
              </Button>
            </div>
          </div>
        )}

        {/* Здесь подключаем SW как компонент */}
        <ServiceWorkerRegister
          onUpdate={() => setUpdateAvailable(true)}
          setRegistration={setSWRegistration}
        />
      </body>
    </html>
  );
}
