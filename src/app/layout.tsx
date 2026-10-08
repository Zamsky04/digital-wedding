import type { Metadata, Viewport } from "next";
import { romantic, body } from "@/lib/fonts";
import "./globals.css";
import "@/components/invitation-opening.css";

export const metadata: Metadata = {
  title: { default: "Undangan Digital | Cerita Cinta dalam Setiap Tema", template: "%s | Undangan Digital" },
  description: "Jelajahi contoh undangan digital bertema Keraton Jawa, Jawa, Sunda, Palembang, dan Mix. Temukan tampilan yang sesuai dengan kisah kalian.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${romantic.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
