import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import PlausibleProvider from "next-plausible";
import "./globals.css";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check Kodam | Cari Khodam Dirimu",
  description: "Siapa tau kamu memiliki khodam terkuat?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="cupcake">
      <head>
        <PlausibleProvider domain="check-khodam-seven.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
