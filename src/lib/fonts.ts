import { Bodoni_Moda, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";

// Preloaded, self-hosted by Next.js so text does not wait on a Google CSS request.
export const display = Bodoni_Moda({
  subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"],
  variable: "--font-display", display: "swap",
});
export const romantic = Cormorant_Garamond({
  subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"],
  variable: "--font-invitation-serif", display: "swap",
});
export const body = Plus_Jakarta_Sans({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-invitation-sans", display: "swap",
});
