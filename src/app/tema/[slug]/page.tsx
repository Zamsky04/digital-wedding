import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ThemePreview from "@/components/ThemePreview";
import { getTheme, otherThemes } from "@/lib/themes";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ to?: string | string[] }> };

export function generateStaticParams() {
  return otherThemes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = getTheme(slug);
  return { title: theme ? `Contoh Undangan ${theme.name}` : "Tema Tidak Ditemukan", description: theme?.intro };
}

export default async function ThemePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme || theme.slug === "keraton-jawa") notFound();
  const to = (await searchParams).to;
  const guestName = (typeof to === "string" ? to.trim() : "").slice(0, 80) || "Tamu Undangan";
  return <ThemePreview theme={theme} guestName={guestName} />;
}
