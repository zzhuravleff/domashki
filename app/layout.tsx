import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from 'next/font/google';
import ServiceWorkerUpdater from "@/components/ServiceWorkerUpdater";

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "ДомашкиМИРЭА",
  description: "Учёт домашних заданий",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.className}>
      <body>
        {children}
        <ServiceWorkerUpdater />
      </body>
    </html>
  );
}