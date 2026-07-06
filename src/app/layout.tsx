import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import { MemorialAtmosphere } from "@/components/MemorialAtmosphere";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "符月华 · 愿逐月华流照君",
  description: "纪念符月华同学生平与追思",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans">
        <SiteHeader />
        <main className="relative">
          <MemorialAtmosphere variant="subtle" />
          <div className="relative">{children}</div>
        </main>
      </body>
    </html>
  );
}
