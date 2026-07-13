import type { Metadata } from "next";
import { MemorialAtmosphere } from "@/components/MemorialAtmosphere";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_NAME, SITE_TITLE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: "纪念符月华同学生平与追思",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
