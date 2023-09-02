import Providers from "@/providers";
import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import { inter, jua, poppins } from "./fonts";
import { siteConfig } from "@/config/site";


const AuthModal = dynamic(() => import("@/components/auth/AuthModal"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jua.variable} ${poppins.variable}`}>
        <Providers>
          {children}
          <AuthModal />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
