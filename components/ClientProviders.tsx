"use client";

import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceWorkerRegister
        onUpdate={() => window.dispatchEvent(new Event("sw-update"))}
      />
      {children}
    </>
  );
}
