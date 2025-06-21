import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/main-layout/Navbar";
import { Footer } from "@/components/main-layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercadito",
  description: "Vende y compra en La Calera, Chile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body, html {
            height: 100%;
            margin: 0;
          }
          
          .main-content {
            flex: 1;
            padding: 3rem 0.5rem 3rem 0.5rem;
          }
          
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="min-h-svh flex flex-col">
          <div className="fixed top-0 w-full z-50">
            <Navbar />
          </div>
          <div className="main-content flex flex-col items-center justify-center justify-items-center gap-8 font-[family-name:var(--font-geist-sans)]">
            {children}
          </div>
        </div>
        <div className="fixed bottom-0 w-full z-50">
          <Footer />
        </div>
      </body>
    </html>
  );
}

// min-h-svh
