"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useInvitationOpening, type InvitationOpening } from "./useInvitationOpening";
import { display, romantic, body } from "@/lib/fonts";
import { HeritageDecor, HeritageOrnament, PortraitFrame } from "./HeritageOrnaments";

/* ------------------------------------------------------------
   DATA MOCK
   ------------------------------------------------------------ */

const GROOM = {
  name: "Bagas Pradipta",
  father: "Wiryono",
  mother: "Sulastri",
  photo:
    "/themes/keraton-jawa.webp",
};

const BRIDE = {
  name: "Sekar Ayuningtyas",
  father: "Haryanto",
  mother: "Ratnawati",
  photo:
    "/themes/keraton-jawa.webp",
};

const WEDDING_DATE_LABEL = "Senin, 21 Desember 2026";
const WEDDING_ISO = "2026-12-21T08:00:00+07:00";
const VENUE_NAME = "Pendopo Agung Puri Arum";
const VENUE_ADDRESS = "Jl. Malioboro No. 88, Yogyakarta, Daerah Istimewa Yogyakarta";

const STORY = [
  {
    year: "2020",
    title: "Pertemuan Pertama",
    desc: "Dua langkah yang tidak sengaja bersilangan di sebuah acara keluarga, dan percakapan singkat yang ternyata membekas.",
  },
  {
    year: "2022",
    title: "Bertumbuh Bersama",
    desc: "Melewati musim yang sederhana maupun yang berat, kami belajar bahwa kebersamaan adalah pilihan yang terus diperbarui.",
  },
  {
    year: "2025",
    title: "Lamaran",
    desc: "Di hadapan keluarga besar, sebuah janji diucapkan — awal dari babak baru yang telah lama kami nantikan.",
  },
  {
    year: "2026",
    title: "Menuju Hari Bahagia",
    desc: "Kini tiba saatnya kami melangkah lebih jauh, menyatukan dua keluarga dalam satu ikatan yang saklawase sesarengan.",
  },
];

const GALLERY = [
  { src: "/themes/keraton-jawa.webp", alt: "Pasangan dalam busana adat Jawa di depan gebyok", span: "tall", position: "78% center" },
  { src: "/themes/keraton-jawa.webp", alt: "Detail suasana gebyok berukir", span: "wide", position: "22% center" },
  { src: "/themes/keraton-jawa.webp", alt: "Busana adat Jawa dengan sulaman emas", span: "regular", position: "100% center" },
  { src: "/themes/keraton-jawa.webp", alt: "Momen kedua mempelai dalam suasana hangat", span: "tall", position: "67% center" },
];

const WISHES = [
  {
    name: "Anisa & Reza",
    text: "Sakinah, mawaddah, warahmah. Semoga selalu diberikan kebahagiaan.",
  },
  {
    name: "Keluarga Besar Wiryono",
    text: "Selamat menempuh hidup baru. Semoga cinta kalian selalu tumbuh.",
  },
  {
    name: "Dimas Prakoso",
    text: "Baarakallahu laka wa baaraka 'alaika wa jama'a bainakumaa fii khair.",
  },
  {
    name: "Puti Handayani",
    text: "Bahagia untuk kalian berdua. Semoga rumah tangga ini menjadi ladang kebaikan.",
  },
];

const ACCOUNTS = [
  { bank: "BCA", number: "1234567890", holder: "Bagas Pradipta" },
  { bank: "Mandiri", number: "0987654321", holder: "Sekar Ayuningtyas" },
];

/* ------------------------------------------------------------
   UTIL — Reveal on scroll (IntersectionObserver)
   ------------------------------------------------------------ */

const InvitationReadyContext = createContext(false);

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ready = useContext(InvitationReadyContext);
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !ready) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, ready]);

  return { ref, inView };
}

function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return React.createElement(
    Tag,
    {
      ref,
      className: `reveal ${inView ? "reveal-in" : ""} ${className}`,
      style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
    },
    children
  );
}

/* ------------------------------------------------------------
   ORNAMENTS — Gunungan & garis ukir (SVG, minimal, reusable)
   ------------------------------------------------------------ */

function Gunungan({
  className = "",
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "ivory" | "sogan";
}) {
  const stroke =
    tone === "gold" ? "#B8955A" : tone === "ivory" ? "#F5F0E6" : "#3A261C";
  return (
    <svg
      viewBox="0 0 220 320"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M110 8
           C 118 40, 96 58, 118 86
           C 138 110, 108 130, 132 156
           C 156 180, 118 200, 146 228
           C 168 250, 128 268, 150 292
           C 128 300, 92 300, 70 292
           C 92 268, 52 250, 74 228
           C 102 200, 64 180, 88 156
           C 112 130, 82 110, 102 86
           C 124 58, 102 40, 110 8 Z"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M46 292 H174"
        stroke={stroke}
        strokeWidth="1.1"
        opacity="0.6"
      />
      <path
        d="M60 300 H160"
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.4"
      />
      <circle cx="110" cy="118" r="3.2" fill={stroke} opacity="0.75" />
      <path
        d="M40 150 C 60 140, 60 170, 40 178"
        stroke={stroke}
        strokeWidth="0.9"
        opacity="0.5"
      />
      <path
        d="M180 150 C 160 140, 160 170, 180 178"
        stroke={stroke}
        strokeWidth="0.9"
        opacity="0.5"
      />
    </svg>
  );
}

function UkiranFlourish({
  className = "",
  color = "#B8955A",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 300 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 20 C 40 4, 60 36, 100 20 C 140 4, 160 36, 200 20 C 220 12, 240 12, 260 20"
        stroke={color}
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="150" cy="20" r="2.4" fill={color} opacity="0.8" />
    </svg>
  );
}

/* Truntum-like dotted pattern, applied as very low-opacity background */
const truntumPattern =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%233A261C' stroke-width='0.6'%3E%3Ccircle cx='16' cy='16' r='3'/%3E%3Cpath d='M16 10v-3M16 25v-3M10 16h-3M25 16h-3'/%3E%3Ccircle cx='48' cy='48' r='3'/%3E%3Cpath d='M48 42v-3M48 57v-3M42 48h-3M57 48h-3'/%3E%3C/g%3E%3C/svg%3E";

/* ------------------------------------------------------------
   OPENING ORNAMENTS — gerbang Keraton / Gebyok
   ------------------------------------------------------------ */

function OpeningGunungan({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 390"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gununganGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E0C38E" />
          <stop offset="48%" stopColor="#B8955A" />
          <stop offset="100%" stopColor="#7F6237" />
        </linearGradient>
        <filter id="gununganGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* siluet utama */}
      <path
        d="M130 10C142 47 122 70 145 100C169 131 146 156 171 186C196 217 166 242 191 272C211 296 184 318 201 339C179 352 157 359 130 360C103 359 81 352 59 339C76 318 49 296 69 272C94 242 64 217 89 186C114 156 91 131 115 100C138 70 118 47 130 10Z"
        fill="#17110D"
        stroke="url(#gununganGold)"
        strokeWidth="2"
        filter="url(#gununganGlow)"
      />

      {/* bingkai dalam */}
      <path
        d="M130 35C139 62 124 82 142 108C159 133 144 154 162 178C181 203 158 226 176 250C193 272 171 294 184 316C166 326 149 331 130 332C111 331 94 326 76 316C89 294 67 272 84 250C102 226 79 203 98 178C116 154 101 133 118 108C136 82 121 62 130 35Z"
        stroke="#D5B77D"
        strokeWidth="1"
        opacity="0.85"
      />

      {/* pohon hayat */}
      <path d="M130 92V294" stroke="#B8955A" strokeWidth="2" />
      <path d="M130 126C108 112 94 106 80 104" stroke="#B8955A" strokeWidth="1.4" />
      <path d="M130 126C152 112 166 106 180 104" stroke="#B8955A" strokeWidth="1.4" />
      <path d="M130 158C102 143 84 140 70 144" stroke="#B8955A" strokeWidth="1.3" />
      <path d="M130 158C158 143 176 140 190 144" stroke="#B8955A" strokeWidth="1.3" />
      <path d="M130 192C107 180 91 180 78 187" stroke="#B8955A" strokeWidth="1.2" />
      <path d="M130 192C153 180 169 180 182 187" stroke="#B8955A" strokeWidth="1.2" />

      {[88, 106, 124, 146, 168, 190].map((cy, i) => (
        <React.Fragment key={cy}>
          <ellipse
            cx={i % 2 === 0 ? 96 : 82}
            cy={cy}
            rx="7"
            ry="4"
            transform={`rotate(${i % 2 === 0 ? -28 : 18} ${i % 2 === 0 ? 96 : 82} ${cy})`}
            fill="#B8955A"
            opacity="0.82"
          />
          <ellipse
            cx={i % 2 === 0 ? 164 : 178}
            cy={cy}
            rx="7"
            ry="4"
            transform={`rotate(${i % 2 === 0 ? 28 : -18} ${i % 2 === 0 ? 164 : 178} ${cy})`}
            fill="#B8955A"
            opacity="0.82"
          />
        </React.Fragment>
      ))}

      {/* ornamen sayap */}
      <path
        d="M63 214C79 203 93 205 107 219C92 220 82 228 73 241C75 228 71 220 63 214Z"
        stroke="#B8955A"
        strokeWidth="1.1"
        opacity="0.8"
      />
      <path
        d="M197 214C181 203 167 205 153 219C168 220 178 228 187 241C185 228 189 220 197 214Z"
        stroke="#B8955A"
        strokeWidth="1.1"
        opacity="0.8"
      />

      {/* dasar gunungan */}
      <path d="M50 344H210" stroke="#B8955A" strokeWidth="1.6" />
      <path d="M67 354H193" stroke="#B8955A" strokeWidth="0.8" opacity="0.7" />
      <path d="M91 364H169" stroke="#B8955A" strokeWidth="0.8" opacity="0.45" />
      <circle cx="130" cy="79" r="4" fill="#D9BB82" />
    </svg>
  );
}

function GebyokPanel({
  side,
  className = "",
}: {
  side: "left" | "right";
  className?: string;
}) {
  const mirrored = side === "right";

  return (
    <svg
      viewBox="0 0 340 1000"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <linearGradient id={`wood-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#120D0A" />
          <stop offset="55%" stopColor="#24160F" />
          <stop offset="100%" stopColor="#3B2417" />
        </linearGradient>
        <linearGradient id={`edge-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7B774" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#76552B" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      <rect width="340" height="1000" fill={`url(#wood-${side})`} />
      <rect x="18" y="0" width="18" height="1000" fill="#0B0806" opacity="0.72" />
      <rect x="49" y="0" width="3" height="1000" fill="#B8955A" opacity="0.3" />
      <rect x="286" y="0" width="4" height="1000" fill="#B8955A" opacity="0.3" />
      <rect x="300" y="0" width="40" height="1000" fill="#0A0705" opacity="0.72" />

      {/* panel-panel ukiran */}
      {[65, 306, 547, 788].map((y) => (
        <g key={y}>
          <rect
            x="72"
            y={y}
            width="188"
            height="188"
            rx="94"
            stroke={`url(#edge-${side})`}
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d={`M98 ${y + 98}C116 ${y + 51} 151 ${y + 36} 166 ${y + 83}C181 ${y + 36} 216 ${y + 51} 234 ${y + 98}C215 ${y + 82} 198 ${y + 91} 188 ${y + 113}C176 ${y + 138} 157 ${y + 138} 145 ${y + 113}C135 ${y + 91} 118 ${y + 82} 98 ${y + 98}Z`}
            stroke="#B8955A"
            strokeWidth="1.4"
            opacity="0.48"
          />
          <circle cx="166" cy={y + 99} r="8" stroke="#B8955A" opacity="0.45" />
        </g>
      ))}

      {/* sulur pinggir */}
      <path
        d="M282 40C235 84 310 132 267 179C228 221 302 270 264 315C227 359 300 405 263 452C226 499 301 544 263 592C225 640 299 684 263 732C226 780 302 824 263 874C239 905 252 944 282 975"
        stroke="#C29A5B"
        strokeWidth="1.6"
        opacity="0.52"
      />
      <path
        d="M311 0V1000"
        stroke="#E0C38E"
        strokeWidth="1.2"
        opacity="0.42"
      />
    </svg>
  );
}

function KeratonCrown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1400 250"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crownWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0806" />
          <stop offset="100%" stopColor="#2A1A12" />
        </linearGradient>
      </defs>
      <path
        d="M0 0H1400V96C1270 93 1158 103 1050 122C913 146 822 155 700 155C578 155 487 146 350 122C242 103 130 93 0 96V0Z"
        fill="url(#crownWood)"
      />
      <path
        d="M0 94C140 86 257 100 368 120C496 143 586 149 700 149C814 149 904 143 1032 120C1143 100 1260 86 1400 94"
        stroke="#B8955A"
        strokeWidth="2"
        opacity="0.56"
      />
      <path
        d="M510 111C560 62 620 50 700 88C780 50 840 62 890 111C821 98 761 101 700 128C639 101 579 98 510 111Z"
        stroke="#B8955A"
        strokeWidth="1.6"
        opacity="0.68"
      />
      <circle cx="700" cy="90" r="6" fill="#B8955A" opacity="0.75" />
      <path d="M700 18V72" stroke="#B8955A" strokeWidth="1.4" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------
   SECTION 01 — OPENING / GERBANG PAWIWAHAN
   ------------------------------------------------------------ */

function OpeningGate({ guestName, experience }: { guestName: string; experience: InvitationOpening }) {
  const { coverRef, phase, open } = experience;
  return (
    <div ref={coverRef} className="invitation-cover opening-shell keraton-cover" data-opening-phase={phase}
      role="dialog" aria-modal="true" aria-labelledby="keraton-cover-title" aria-busy={phase === "opening"}>
      <div className="absolute inset-0" data-opening-backdrop>
        <img src="/themes/keraton-jawa.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120D0A]/85 via-[#21150e]/65 to-[#120D0A]/90" />
      </div>
      <div className="keraton-door keraton-door-left" data-opening-panel data-opening-panel-left aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: `url("${truntumPattern}")` }} />
        <GebyokPanel side="left" className="absolute inset-y-0 left-0 h-full w-[40%] max-w-[240px] opacity-75" />
      </div>
      <div className="keraton-door keraton-door-right" data-opening-panel data-opening-panel-right aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: `url("${truntumPattern}")` }} />
        <GebyokPanel side="right" className="absolute inset-y-0 right-0 h-full w-[40%] max-w-[240px] opacity-75" />
      </div>
      <div data-opening-crown className="pointer-events-none absolute inset-x-0 top-0 z-[2]" aria-hidden="true">
        <KeratonCrown className="h-[12svh] min-h-[60px] max-h-[120px] w-full md:h-[16svh] md:max-h-[160px]" />
      </div>
      <Link href="/#tema" className="invitation-back" aria-label="Kembali ke daftar tema">Semua tema</Link>
      <div className="opening-content relative z-10 mx-auto flex w-full flex-col items-center justify-center text-center" data-opening-content>
        <div className="opening-kicker">
          <p className="font-body text-[9px] tracking-[0.35em] text-[#D8BA7C]/80">ADILUHUNG</p>
          <p className="mt-1.5 font-body text-[10px] tracking-[0.3em] text-[#B8955A]">PAWIWAHAN</p>
        </div>
        <OpeningGunungan className="keraton-mark" />
        <div className="opening-divider my-3 flex w-full max-w-[260px] items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B8955A]/60" />
          <span className="h-1.5 w-1.5 rotate-45 border border-[#B8955A]/80" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B8955A]/60" />
        </div>
        <p className="font-body text-[9px] tracking-[0.24em] text-[#D8BA7C]/80">THE WEDDING OF</p>
        <h1 id="keraton-cover-title" className="opening-names mt-2 font-display leading-[0.9] text-[#F5F0E6]">
          <span className="opening-name block font-normal tracking-[-0.025em]">Bagas</span>
          <span className="opening-ampersand my-1 block font-display text-xl italic text-[#C9A665]">&amp;</span>
          <span className="opening-name block font-normal tracking-[-0.025em]">Sekar</span>
        </h1>
        <div className="opening-date mt-4 flex max-w-full items-center justify-center gap-3">
          <span className="h-px w-4 shrink-0 bg-[#B8955A]/45" aria-hidden="true" />
          <p className="font-body text-[9px] tracking-[0.08em] text-[#EDE4D3]/80">{WEDDING_DATE_LABEL.toUpperCase()}</p>
          <span className="h-px w-4 shrink-0 bg-[#B8955A]/45" aria-hidden="true" />
        </div>
        <div className="opening-guest mt-5 w-full max-w-[340px]">
          <p className="font-body tracking-[0.04em] text-[#EDE4D3]/70">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="mt-1.5 font-display text-[#F5F0E6]">{guestName}</p>
        </div>
        <button type="button" onClick={open} disabled={phase !== "closed"} data-opening-button
          className="opening-button mt-5 inline-flex items-center justify-center gap-3 font-body">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
          <span>Buka Undangan</span>
        </button>
        <p className="opening-quote mt-4 font-romantic italic leading-relaxed text-[#EDE4D3]/70">“Saklawase sesarengan, tumbuh dalam kasih dan restu.”</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   SECTION 01b — REVEAL SETELAH GERBANG TERBUKA
   Tidak mengulang opening; ini adalah "ruang dalam" setelah gerbang.
   ------------------------------------------------------------ */

function HeroSection({ guestName }: { guestName: string }) {
  return (
    <section id="beranda" className="keraton-hero">
      <img src="/themes/keraton-jawa.webp" alt="Pasangan berbusana adat Jawa di depan gebyok berukir" className="keraton-hero-photo" loading="eager" />
      <div className="keraton-hero-shade" />
      <div className="keraton-hero-frame" />
      <HeritageDecor theme="keraton-jawa" />
      <div className="keraton-hero-content" data-invitation-hero-content>
        <HeritageOrnament theme="keraton-jawa" kind="emblem" className="keraton-hero-sigil" />
        <p className="keraton-eyebrow">PAWIWAHAN · ADAT JAWA</p>
        <h2 className="keraton-hero-names">Bagas <em>&amp;</em> Sekar</h2>
        <p className="keraton-hero-phrase">Manunggaling kalih ati.</p>
        <p className="keraton-hero-date">{WEDDING_DATE_LABEL}</p>
        <HeritageOrnament theme="keraton-jawa" />
        <p className="keraton-hero-guest">Dengan penuh hormat, kami mengundang<br /><strong>{guestName}</strong></p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 02 — INTRODUCTION
   ------------------------------------------------------------ */

function IntroductionSection() {
  return (
    <section className="keraton-introduction relative bg-[#F5F0E6] py-24 md:py-32 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: `url("${truntumPattern}")` }} />
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-6">
            PAWIWAHAN
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="font-romantic text-2xl md:text-3xl italic text-[#3A261C] leading-relaxed">
            Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami
            bermaksud menyelenggarakan pernikahan kami.
          </p>
        </Reveal>
        <Reveal delay={260} className="mt-10 flex justify-center">
          <UkiranFlourish className="w-40" color="#B8955A" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 03 — THE COUPLE
   ------------------------------------------------------------ */

function PersonBlock({ person, align }: { person: typeof GROOM; align: "left" | "right" }) {
  const groom = align === "left";
  return (
    <Reveal className={`keraton-person keraton-person--${groom ? "groom" : "bride"}`}>
      <PortraitFrame theme="keraton-jawa">
        <div className="keraton-person-photo"><img src={person.photo} alt={`${person.name}, mempelai ${groom ? "pria" : "wanita"} dalam busana adat Jawa`} loading="lazy" /></div>
      </PortraitFrame>
      <p className="keraton-person-role">{groom ? "MEMPELAI PRIA" : "MEMPELAI WANITA"}</p>
      <h3 className="keraton-person-name">{person.name}</h3>
      <p className="keraton-person-parents">{groom ? "Putra" : "Putri"} dari<br />Bapak {person.father}<br />&amp; Ibu {person.mother}</p>
    </Reveal>
  );
}

function CoupleSection() {
  return (
    <section id="mempelai" className="relative keraton-couple">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="keraton-couple-heading">
        <p className="keraton-couple-kicker">KANTHI DOA LAN PANGESTU</p>
        <h2 className="keraton-couple-title">Pengantin Kekalih</h2>
        <HeritageOrnament theme="keraton-jawa" />
      </Reveal>
      <div className="keraton-couple-grid">
        <PersonBlock person={GROOM} align="left" />
        <Reveal className="keraton-couple-join"><HeritageOrnament theme="keraton-jawa" kind="emblem" /><span>&amp;</span></Reveal>
        <PersonBlock person={BRIDE} align="right" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 04 — CINEMATIC PRE-WEDDING (parallax ringan)
   ------------------------------------------------------------ */

function CinematicSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const node = ref.current;
    const image = imageRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || !image || media.matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = 1 - (rect.top + rect.height / 2) / (vh + rect.height);
      image.style.transform = `translateY(${Math.max(-1, Math.min(1, progress)) * 28}px)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      image.style.transform = "";
    };
  }, []);

  return (
    <section ref={ref} className="keraton-cinematic relative h-[75svh] md:h-[85svh] overflow-hidden bg-[#161412]">
      <HeritageDecor theme="keraton-jawa" />
      <img
        ref={imageRef}
        src="/themes/keraton-jawa.webp"
        alt="Mempelai dalam busana adat Jawa dengan latar gebyok"
        loading="lazy"
        className="absolute inset-0 h-[130%] w-full object-cover -top-[15%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#161412]/70 via-transparent to-[#161412]/85" />
      <Reveal className="relative z-10 h-full flex items-center justify-center px-6">
        <p className="font-romantic italic text-2xl md:text-4xl text-[#F5F0E6] text-center max-w-2xl leading-relaxed">
          &ldquo;Cinta bukan tentang menemukan seseorang yang sempurna,
          melainkan menemukan rumah dalam satu sama lain.&rdquo;
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 05 — JAVANESE PHILOSOPHY
   ------------------------------------------------------------ */

function PhilosophySection() {
  return (
    <section className="relative bg-[#EDE4D3] py-28 md:py-40 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("${truntumPattern}")` }} />
      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-6">
            FILOSOFI
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p className="font-display text-[42px] leading-none text-[#3A261C]/15 select-none">
            ꦠ꧀ꦉꦱ꧀ꦤ
          </p>
        </Reveal>
        <Reveal delay={180}>
          <h2 className="font-display italic text-3xl md:text-5xl text-[#3A261C] mt-4">
            Tresna Jalaran Saka Kulina
          </h2>
        </Reveal>
        <Reveal delay={280}>
          <p className="font-body text-[#66634A] text-sm md:text-base leading-relaxed mt-8">
            Falsafah Jawa ini mengajarkan bahwa cinta sejati sering kali
            tumbuh bukan dari pertemuan yang dramatis, melainkan dari
            kebersamaan yang perlahan terjalin — dari waktu yang dihabiskan
            bersama, dari kepercayaan yang dibangun setiap hari, hingga
            keduanya menyadari bahwa satu sama lain telah menjadi rumah.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 06 — LOVE STORY (timeline)
   ------------------------------------------------------------ */

function StoryItem({
  item,
  index,
}: {
  item: (typeof STORY)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <Reveal
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      delay={index * 80}
    >
      <div className="w-full md:w-1/2">
        <div className="keraton-story-vignette">
          <HeritageDecor theme="keraton-jawa" />
          <HeritageOrnament theme="keraton-jawa" kind="emblem" />
          <strong>{item.year}</strong>
          <span>SEBUAH BAB DALAM KISAH KAMI</span>
        </div>
      </div>
      <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"} text-left`}>
        <p className="font-display text-5xl md:text-6xl text-[#B8955A]/70">
          {item.year}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-[#3A261C] mt-2">
          {item.title}
        </h3>
        <p className="font-body text-sm text-[#66634A] leading-relaxed mt-3 max-w-sm md:ml-auto">
          {item.desc}
        </p>
      </div>
    </Reveal>
  );
}

function LoveStorySection() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  return (
    <section id="kisah" className="relative bg-[#F5F0E6] py-24 md:py-36 px-6 md:px-10">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="text-center mb-16 md:mb-24">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          KISAH
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-[#3A261C]">
          Kisah Cinta Kami
        </h2>
        <p className="font-body text-sm text-[#66634A] mt-4">
          Setiap perjalanan memiliki awal, dan inilah perjalanan kami.
        </p>
      </Reveal>

      <div ref={ref} className="relative mx-auto max-w-4xl">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#3A261C]/10 md:-translate-x-1/2">
          <div
            ref={lineRef}
            className="h-full w-full bg-[#B8955A] origin-top transition-transform duration-[1800ms] ease-gentle"
            style={{ transform: inView ? "scaleY(1)" : "scaleY(0)" }}
          />
        </div>
        <div className="flex flex-col gap-16 md:gap-24 pl-8 md:pl-0">
          {STORY.map((item, i) => (
            <StoryItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 07 — SAVE THE DATE (editorial typography)
   ------------------------------------------------------------ */

function SaveTheDateSection() {
  return (
    <section id="acara" className="relative bg-[#EDE4D3] py-24 md:py-36 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <HeritageOrnament theme="keraton-jawa" className="keraton-event-ornament" />
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-6">
          <Reveal className="text-left md:text-right order-2 md:order-1">
            <p className="font-body text-xs tracking-[0.3em] text-[#B8955A] mb-3">
              AKAD NIKAH
            </p>
            <p className="font-display text-2xl text-[#3A261C]">08.00 WIB</p>
            <p className="font-body text-sm text-[#66634A] mt-2">
              {VENUE_NAME}
            </p>
          </Reveal>

          <Reveal className="order-1 md:order-2 text-center" delay={100}>
            <p className="font-body text-xs sm:text-sm tracking-[0.35em] sm:tracking-[0.4em] text-[#66634A]">
              SENIN
            </p>
            <p className="font-display text-[28vw] sm:text-[9rem] md:text-[11rem] leading-[0.8] text-[#3A261C]">
              21
            </p>
            <p className="font-body text-xs sm:text-sm tracking-[0.35em] sm:tracking-[0.4em] text-[#66634A]">
              DESEMBER &middot; 2026
            </p>
          </Reveal>

          <Reveal className="text-left order-3" delay={200}>
            <p className="font-body text-xs tracking-[0.3em] text-[#B8955A] mb-3">
              RESEPSI
            </p>
            <p className="font-display text-2xl text-[#3A261C]">11.00 WIB</p>
            <p className="font-body text-sm text-[#66634A] mt-2">
              {VENUE_NAME}
            </p>
          </Reveal>
        </div>

        <Reveal delay={300} className="flex justify-center mt-14">
          <UkiranFlourish className="w-52" color="#B8955A" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 08 — COUNTDOWN (real, client-side)
   ------------------------------------------------------------ */

function useCountdown(targetIso: string) {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRemaining({ days, hours, minutes, seconds });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return remaining;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center px-1.5 sm:px-3">
      <span className="font-display text-[clamp(1.75rem,9vw,3rem)] leading-none text-[#F5F0E6] tabular-nums md:text-7xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 max-w-full truncate font-body text-[8px] tracking-[0.12em] text-[#B8955A] sm:text-[10px] sm:tracking-[0.22em] md:text-xs">
        {label.toUpperCase()}
      </span>
    </div>
  );
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_ISO);

  return (
    <section className="relative overflow-hidden bg-[#161412] px-4 py-24 sm:px-6 sm:py-28 md:py-40">
      <HeritageDecor theme="keraton-jawa" />
      <img
        src="/themes/keraton-jawa.webp"
        alt="Ukiran gebyok dan suasana pernikahan adat Jawa"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[#161412]/72" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-body text-[10px] tracking-[0.3em] text-[#B8955A] sm:text-xs sm:tracking-[0.35em]">
            HITUNG MUNDUR
          </p>
          <h2 className="mb-10 mt-4 font-display text-3xl italic text-[#F5F0E6] sm:mb-14 md:text-5xl">
            Menuju Hari Bahagia
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto grid max-w-[520px] grid-cols-4 divide-x divide-[#B8955A]/24">
            <CountdownUnit value={days} label="Hari" />
            <CountdownUnit value={hours} label="Jam" />
            <CountdownUnit value={minutes} label="Menit" />
            <CountdownUnit value={seconds} label="Detik" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 09 — VENUE + Google Maps
   ------------------------------------------------------------ */

function VenueSection() {
  const mapsQuery = encodeURIComponent(`${VENUE_NAME}, Malioboro, Yogyakarta`);
  return (
    <section className="relative bg-[#F5F0E6] py-24 md:py-36 px-6 md:px-10">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="text-center mb-14">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          LOKASI
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-[#3A261C]">
          Tempat Kami Mengucap Janji
        </h2>
      </Reveal>

      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <Reveal className="keraton-venue-photo aspect-[4/5] overflow-hidden">
          <img
            src="/themes/keraton-jawa.webp"
            alt="Ilustrasi suasana gebyok untuk perayaan adat Jawa"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-[#3A261C]">
              {VENUE_NAME}
            </h3>
            <p className="font-body text-sm text-[#66634A] mt-2 leading-relaxed">
              {VENUE_ADDRESS}
            </p>
          </div>

          <div className="border border-[#3A261C]/15 overflow-hidden">
            <iframe
              title="Lokasi Pendopo Agung Puri Arum"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              width="100%"
              height="300"
              loading="lazy"
              className="venue-map"
              style={{ border: 0, filter: "grayscale(15%) contrast(1.02)" }}
            />
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 text-sm text-[#3A261C] font-body tracking-wide"
          >
            Buka Google Maps
            <span className="inline-block w-5 h-px bg-[#B8955A] transition-all duration-500 group-hover:w-8" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 10 — DRESS CODE
   ------------------------------------------------------------ */

const DRESS_COLORS = [
  { name: "Sogan", hex: "#3A261C" },
  { name: "Ivory", hex: "#F5F0E6" },
  { name: "Olive", hex: "#66634A" },
  { name: "Brown", hex: "#5A4433" },
  { name: "Muted Gold", hex: "#B8955A" },
];

function DressCodeSection() {
  return (
    <section className="relative bg-[#EDE4D3] py-20 md:py-28 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          BUSANA
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-[#3A261C] mb-3">
          Formal &middot; Batik &middot; Earth Tone
        </h2>
        <p className="font-body text-sm text-[#66634A] mb-8">
          Kami mengundang Anda mengenakan busana formal bernuansa alam.
        </p>
        <div className="flex justify-center gap-4">
          {DRESS_COLORS.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span
                className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-[#3A261C]/15"
                style={{ backgroundColor: c.hex }}
              />
              <span className="font-body text-[10px] text-[#66634A]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 11 — GALLERY (editorial masonry)
   ------------------------------------------------------------ */

function GallerySection() {
  return (
    <section id="galeri" className="relative bg-[#F5F0E6] px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-36">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="mb-12 text-center md:mb-20">
        <p className="mb-4 font-body text-[10px] tracking-[0.32em] text-[#B8955A] sm:text-xs sm:tracking-[0.35em]">
          GALERI
        </p>
        <h2 className="font-display text-3xl text-[#3A261C] md:text-5xl">
          Galeri Kami
        </h2>
        <p className="mx-auto mt-4 max-w-sm font-romantic text-sm italic leading-relaxed text-[#66634A]/80 sm:text-base">
          Potongan kecil dari perjalanan yang membawa kami menuju hari ini.
        </p>
      </Reveal>

      <div className="editorial-gallery mx-auto max-w-6xl">
        {GALLERY.map((img, i) => (
          <Reveal
            key={img.src + i}
            delay={(i % 3) * 70}
            className={`editorial-gallery-item editorial-gallery-item-${i + 1} group overflow-hidden`}
          >
            <div
              className={`w-full overflow-hidden ${
                img.span === "tall"
                  ? "aspect-[3/4.1]"
                  : img.span === "wide"
                  ? "aspect-[4/3]"
                  : "aspect-[3/3.65]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ objectPosition: img.position }}
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-gentle group-hover:scale-[1.04]"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 12 — OUR FILM
   ------------------------------------------------------------ */

function FilmSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="relative bg-[#161412] py-24 md:py-36 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="text-center mb-12">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          FILM PERNIKAHAN
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-[#F5F0E6]">
          Our Film
        </h2>
      </Reveal>

      <Reveal delay={100} className="mx-auto max-w-4xl">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="relative block w-full aspect-video overflow-hidden group"
          aria-label="Putar film pernikahan"
        >
          <img
            src="/themes/keraton-jawa.webp"
            alt="Thumbnail film pernikahan"
            loading="lazy"
            className="h-full w-full object-cover opacity-70 transition-transform duration-[1200ms] ease-gentle group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[#161412]/40" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#F5F0E6]/50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#F5F0E6] translate-x-[1px]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={playing ? "M6 5h4v14H6zM14 5h4v14h-4z" : "M8 5v14l11-7z"} />
              </svg>
            </span>
          </span>
          {playing && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-wide text-[#F5F0E6]/70">
              Pratinjau film segera hadir
            </span>
          )}
        </button>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 13 — RSVP
   ------------------------------------------------------------ */

function RSVPSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak">("hadir");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4000);
    setName("");
    setMessage("");
    setGuests("1");
    setAttendance("hadir");
  };

  return (
    <section id="rsvp" className="relative bg-[#EDE4D3] py-24 md:py-36 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="text-center mb-14">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          RSVP
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-[#3A261C]">
          Konfirmasi Kehadiran
        </h2>
      </Reveal>

      <Reveal delay={100} className="mx-auto max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block font-body text-xs tracking-wide text-[#66634A] mb-2">
              Nama
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap Anda"
              className="min-h-11 w-full bg-transparent border-b border-[#3A261C]/25 focus:border-[#B8955A] outline-none py-2.5 font-body text-[#3A261C] placeholder:text-[#3A261C]/30 transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs tracking-wide text-[#66634A] mb-2">
              Konfirmasi Kehadiran
            </label>
            <div className="flex flex-col gap-2">
              {(
                [
                  { value: "hadir", label: "Dengan senang hati akan hadir" },
                  { value: "tidak", label: "Mohon maaf belum dapat hadir" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className="flex min-h-11 items-center gap-3 font-body text-sm text-[#3A261C] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={opt.value}
                    checked={attendance === opt.value}
                    onChange={() => setAttendance(opt.value)}
                    className="accent-[#B8955A]"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs tracking-wide text-[#66634A] mb-2">
              Jumlah Tamu
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="min-h-11 w-full bg-transparent border-b border-[#3A261C]/25 focus:border-[#B8955A] outline-none py-2.5 font-body text-[#3A261C]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div>
            <label className="block font-body text-xs tracking-wide text-[#66634A] mb-2">
              Pesan untuk mempelai
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Tuliskan doa dan harapan Anda"
              className="min-h-[96px] w-full bg-transparent border-b border-[#3A261C]/25 focus:border-[#B8955A] outline-none py-2.5 font-body text-[#3A261C] placeholder:text-[#3A261C]/30 resize-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full sm:w-auto sm:self-start border border-[#3A261C]/60 px-8 py-3.5 sm:py-3 font-body text-sm tracking-[0.2em] text-[#3A261C] transition-colors duration-500 hover:bg-[#3A261C] hover:text-[#F5F0E6] active:bg-[#3A261C] active:text-[#F5F0E6]"
          >
            KIRIM KONFIRMASI
          </button>
        </form>

        <div
          className={`mt-6 font-body text-sm text-[#3A261C] border-l-2 border-[#B8955A] pl-4 transition-all duration-500 ${
            submitted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          role="status"
        >
          Terima kasih. Konfirmasi kehadiran Anda telah diterima.
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 14 — WEDDING WISHES
   ------------------------------------------------------------ */

function WishesSection() {
  return (
    <section id="ucapan" className="relative bg-[#F5F0E6] py-24 md:py-36 px-6 md:px-10">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="text-center mb-14 md:mb-20">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          DOA &amp; UCAPAN
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-[#3A261C]">
          Doa &amp; Ucapan
        </h2>
      </Reveal>

      <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {WISHES.map((w, i) => (
          <Reveal
            key={w.name}
            delay={i * 90}
            className="border-t border-[#3A261C]/12 pt-6"
          >
            <p className="font-romantic italic text-lg md:text-xl text-[#3A261C] leading-relaxed">
              &ldquo;{w.text}&rdquo;
            </p>
            <p className="font-body text-xs tracking-wide text-[#66634A] mt-4">
              — {w.name}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 15 — WEDDING GIFT
   ------------------------------------------------------------ */

function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      /* clipboard unavailable — silently ignore in prototype */
    }
  };

  return (
    <section className="relative bg-[#EDE4D3] py-24 md:py-36 px-6">
      <HeritageDecor theme="keraton-jawa" />
      <Reveal className="mx-auto max-w-lg text-center mb-12">
        <p className="font-body text-xs tracking-[0.35em] text-[#B8955A] mb-4">
          TANDA KASIH
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#3A261C] mb-5">
          Tanda Kasih
        </h2>
        <p className="font-body text-sm text-[#66634A] leading-relaxed">
          Doa dan kehadiran Anda merupakan hadiah terindah bagi kami. Namun
          apabila Anda berkenan memberikan tanda kasih, kami menerimanya
          dengan penuh rasa syukur.
        </p>
      </Reveal>

      <div className="mx-auto max-w-lg flex flex-col gap-4">
        {ACCOUNTS.map((acc, i) => (
          <Reveal
            key={acc.number}
            delay={i * 100}
            className="flex items-center justify-between gap-3 border border-[#3A261C]/15 px-4 sm:px-6 py-5 bg-[#F5F0E6]/40"
          >
            <div className="min-w-0">
              <p className="font-body text-xs tracking-wide text-[#B8955A]">
                {acc.bank}
              </p>
              <p className="font-display text-lg sm:text-xl text-[#3A261C] tracking-wide mt-1 truncate">
                {acc.number}
              </p>
              <p className="font-body text-xs text-[#66634A] mt-1 truncate">
                a.n. {acc.holder}
              </p>
            </div>
            <button
              onClick={() => handleCopy(acc.number, i)}
              className="shrink-0 font-body text-xs tracking-wide text-[#3A261C] border border-[#3A261C]/30 px-4 py-2.5 sm:py-2 hover:bg-[#3A261C] hover:text-[#F5F0E6] active:bg-[#3A261C] active:text-[#F5F0E6] transition-colors duration-400 whitespace-nowrap"
            >
              {copiedIndex === i ? "Tersalin" : "Salin"}
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SECTION 16 — CLOSING
   ------------------------------------------------------------ */

function ClosingSection() {
  return (
    <section className="relative bg-[#161412] py-28 md:py-44 px-6 overflow-hidden">
      <HeritageDecor theme="keraton-jawa" />
      <img
        src="/themes/keraton-jawa.webp"
        alt="Pasangan dengan latar gebyok dan busana adat Jawa"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#161412]/90 via-[#161412]/80 to-[#161412]" />

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <Gunungan tone="gold" className="w-16 mx-auto mb-10 opacity-90" />
        </Reveal>
        <Reveal delay={100}>
          <p className="font-body text-[#EDE4D3]/75 text-sm md:text-base leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[#B8955A] mt-8 sm:mt-10">
            Matur Nuwun
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-[#F5F0E6] mt-5 sm:mt-6">
            Bagas &amp; Sekar
          </p>
          <p className="font-body text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#EDE4D3]/50 mt-3">
            {WEDDING_DATE_LABEL.toUpperCase()}
          </p>
        </Reveal>

        <Reveal delay={360} className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#B8955A]/20">
          <p className="font-romantic italic text-base sm:text-lg md:text-xl text-[#EDE4D3]/70 leading-relaxed">
            Dalam budaya kami menemukan akar.
            <br />
            Dalam cinta kami menemukan rumah.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   FLOATING MUSIC CONTROL
   ------------------------------------------------------------ */

function FloatingMusicControl({ visible }: { visible: boolean }) {
  const [playing, setPlaying] = useState(false);

  if (!visible) return null;

  return (
    <button
      onClick={() => setPlaying((p) => !p)}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
      className="music-control fixed z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#B8955A]/40 bg-[#211713]/90 text-[#B8955A] shadow-[0_8px_28px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-transform duration-500 hover:scale-105 sm:h-12 sm:w-12"
    >
      <span className={`font-display text-lg ${playing ? "animate-spin-slow" : ""}`}>
        &#9835;
      </span>
    </button>
  );
}

/* ------------------------------------------------------------
   ROOT PAGE
   ------------------------------------------------------------ */

function InvitationContent({ guestName }: { guestName: string }) {
  const experience = useInvitationOpening("gate");
  const { opened, mainRef, phase } = experience;

  return (
    <div className={`${display.variable} ${romantic.variable} ${body.variable} keraton-experience min-w-0 overflow-x-clip font-sans bg-[#F5F0E6]`} data-invitation-state={phase}>
      {opened && <Link href="/#tema" className="invitation-back" aria-label="Kembali ke daftar tema">Semua tema</Link>}
      {!opened && <OpeningGate guestName={guestName} experience={experience} />}

      <InvitationReadyContext.Provider value={opened}>
      <main ref={mainRef} className="invitation-main" tabIndex={-1} inert={!opened} aria-hidden={!opened} aria-label="Isi undangan pernikahan Bagas dan Sekar">
        <HeroSection guestName={guestName} />
        <IntroductionSection />
        <CoupleSection />
        <CinematicSection />
        <PhilosophySection />
        <LoveStorySection />
        <SaveTheDateSection />
        <CountdownSection />
        <VenueSection />
        <DressCodeSection />
        <GallerySection />
        <FilmSection />
        <RSVPSection />
        <WishesSection />
        <GiftSection />
        <ClosingSection />
      </main>
      </InvitationReadyContext.Provider>

      <FloatingMusicControl visible={opened} />

      <style jsx global>{`
        :root {
          --font-display: ${display.style.fontFamily};
          --font-romantic: ${romantic.style.fontFamily};
          --font-body: ${body.style.fontFamily};
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-x: hidden;
        }
        .font-display {
          font-family: var(--font-display), serif;
          font-optical-sizing: auto;
          text-rendering: optimizeLegibility;
        }
        .font-romantic {
          font-family: var(--font-romantic), serif;
          text-rendering: optimizeLegibility;
        }
        .font-body,
        .font-sans {
          font-family: var(--font-body), sans-serif;
        }
        .ease-gentle {
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-in {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          display: inline-block;
          animation: spin-slow 6s linear infinite;
        }

        .hero-story-content {
          padding-bottom: max(5rem, calc(env(safe-area-inset-bottom) + 3.75rem));
        }
        .music-control {
          right: max(1rem, calc(env(safe-area-inset-right) + 0.8rem));
          bottom: max(1rem, calc(env(safe-area-inset-bottom) + 0.8rem));
        }
        .editorial-gallery {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .editorial-gallery-item {
          width: 100%;
        }
        .editorial-gallery-item-2,
        .editorial-gallery-item-6 {
          width: 82%;
          justify-self: end;
        }
        .editorial-gallery-item-3,
        .editorial-gallery-item-7 {
          width: 76%;
          justify-self: start;
        }
        .editorial-gallery-item-5 {
          width: 88%;
          justify-self: center;
        }
        @media (min-width: 430px) {
          .editorial-gallery {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }
          .editorial-gallery-item {
            width: 100%;
            justify-self: stretch;
          }
          .editorial-gallery-item-1,
          .editorial-gallery-item-4 {
            grid-row: span 2;
          }
        }
        @media (min-width: 768px) {
          .editorial-gallery {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.5rem;
          }
          .editorial-gallery-item-1,
          .editorial-gallery-item-4 {
            grid-row: span 2;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }
          html {
            scroll-behavior: auto;
          }
          .animate-spin-slow {
            animation: none;
          }
          .origin-top { transition: none; transform: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function KeratonInvitation({ guestName }: { guestName: string }) {
  return <InvitationContent guestName={guestName} />;
}
