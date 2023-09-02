"use client";
import { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { ClientProvider } from "./TrpcProvider";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ClientProvider>{children}</ClientProvider>
    </SessionProvider>
  );
};

export default Providers;
