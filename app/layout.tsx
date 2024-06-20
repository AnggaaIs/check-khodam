import type { Metadata } from "next";
import { Inter, Nunito, Poppins } from "next/font/google";
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
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
