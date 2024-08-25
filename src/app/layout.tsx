import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../styles/globals.css";
import HeaderComponent from "@/components/Header";
import { Toaster } from "sonner";
import ClientWrapper from "@/components/Wrapper";
import SessionAuthProvider from "@/context/SessionAuthProviders";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boiler - Sistema de RRPP",
  description: "Sistema para públicas de Boiler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionAuthProvider>
        <body className={nunito.className}>
          <div
            id="__next"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <HeaderComponent />
            <Toaster richColors position="top-center" />
            <ClientWrapper>{children}</ClientWrapper>
            {/* <Footer  /> */}
          </div>
          {/* <Analytics /> */}
        </body>
      </SessionAuthProvider>
    </html>
  );
}
