"use client";

import { useState } from "react";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { Inter } from 'next/font/google';
import "../styles/globals.css";
import Head from "next/head";

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  return (
    <>
    <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#f3f4f6" />
        <link rel="manifest" href="/manifest.json" />
    </Head>
    <html lang="ru" className={`bg-gray-100 ${inter.className}`}>
      <body>
        <ServiceWorkerRegister
          setRegistration={setRegistration}
          onUpdate={() => setUpdateAvailable(true)}
        />

        {updateAvailable && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-yellow-300 p-4 rounded-xl shadow-lg flex gap-4">
            <span>Доступно обновление!</span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => {
                if (!registration?.waiting) return;
                registration.waiting.postMessage({ type: "SKIP_WAITING" });
                window.location.reload();
              }}
            >
              Обновить
            </button>
          </div>
        )}

        {children}
      </body>
    </html>
    </>
  );
}
