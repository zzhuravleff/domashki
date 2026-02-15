import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from 'next/font/google'
import ClientProviders from "@/components/ClientProviders";
 
const inter = Inter({
  subsets: ['latin'],
})

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
          <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}