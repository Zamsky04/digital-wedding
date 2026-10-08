import type { Metadata } from "next";
import KeratonInvitation from "@/components/KeratonInvitation";

export const metadata: Metadata = {
  title: "Contoh Undangan Keraton Jawa",
  description: "Pratinjau undangan digital bernuansa Keraton Jawa, gunungan, dan gebyok.",
};

export default async function KeratonPage({ searchParams }: { searchParams: Promise<{ to?: string | string[] }> }) {
  const to = (await searchParams).to;
  const guestName = (typeof to === "string" ? to.trim() : "").slice(0, 80) || "Tamu Undangan";
  return <KeratonInvitation guestName={guestName} />;
}
