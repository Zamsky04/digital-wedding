import type { Theme, ThemeSlug } from "@/lib/themes";
import { HeritageDecor, HeritageOrnament, PortraitFrame } from "./HeritageOrnaments";
import "./theme-identity.css";

type PreviewSlug = Exclude<ThemeSlug, "keraton-jawa">;

export const themeIdentity: Record<PreviewSlug, { couple: string; story: string; events: string; gallery: string; location: string; rsvp: string }> = {
  jawa: { couple: "Mempelai & restu keluarga", story: "Tumbuh bersama, saklawase.", events: "Hari bahagia di pendopo", gallery: "Kenangan dalam bingkai waktu", location: "Bertemu di pendopo", rsvp: "Kami menanti kehadiran Anda" },
  sunda: { couple: "Dua hati yang bersemi", story: "Dari pertemuan, mekar kasih.", events: "Hari kasih bersemi", gallery: "Mekarnya sebuah cerita", location: "Di taman, kita merayakan", rsvp: "Mari berbagi hari bahagia" },
  palembang: { couple: "Dalam restu, kami bersatu", story: "Kisah yang terjalin indah.", events: "Perayaan dalam kemilau tradisi", gallery: "Potret penuh kenangan", location: "Tempat kisah dirayakan", rsvp: "Lengkapi perayaan kami" },
  mix: { couple: "Dua akar, satu ikatan", story: "Dua jalan bertemu di sini.", events: "Satu hari, dua tradisi", gallery: "Cerita dari dua sisi", location: "Berjumpa dalam harmoni", rsvp: "Satu undangan untuk Anda" },
};

export function PendopoRoof({ className = "" }: { className?: string }) {
  return <svg className={`pendopo-roof ${className}`} viewBox="0 0 600 120" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false"><path d="M20 94H580L437 56L365 12H235L163 56ZM57 102H543M176 57H424M220 25H380M83 102V119M517 102V119M143 102V119M457 102V119M300 12V58" /><path d="M43 91Q75 76 101 72M557 91Q525 76 499 72M240 12L206 56M360 12L394 56" /></svg>;
}

function Photo({ theme, className = "" }: { theme: Theme; className?: string }) {
  return <div className={`identity-photo-image ${className}`} style={{ backgroundImage: `url("${theme.photo}")`, backgroundPosition: theme.photoPosition }} role="img" aria-label={`Aruna dan Bima dalam busana adat tema ${theme.name}`} />;
}

function HeroNames() {
  return <h2>Aruna <em>&amp;</em> Bima</h2>;
}

export function ThemeHero({ theme }: { theme: Theme }) {
  if (theme.slug === "jawa") return <section className="preview-hero" data-theme-composition="pendopo">
    <HeritageDecor theme="jawa" />
    <PendopoRoof className="jawa-hero-roof" />
    <div className="jawa-hero-layout" data-invitation-hero-content>
      <div className="preview-hero-content"><p className="preview-kicker">{theme.eyebrow}</p><HeritageOrnament theme="jawa" kind="emblem" className="preview-hero-emblem" /><HeroNames /><p className="preview-hero-tagline">{theme.tagline}</p><p className="preview-date">21 · 08 · 2027</p><a href="#kisah" className="preview-scroll">Jelajahi kisah kami</a></div>
      <figure className="identity-hero-photo jawa-hero-photo"><Photo theme={theme} /><HeritageOrnament theme="jawa" /><figcaption>Dengan restu, menuju saklawase.</figcaption></figure>
    </div>
  </section>;

  if (theme.slug === "sunda") return <section className="preview-hero" data-theme-composition="garden">
    <HeritageDecor theme="sunda" />
    <div className="sunda-hero-layout" data-invitation-hero-content>
      <div className="preview-hero-content"><p className="preview-kicker">{theme.eyebrow}</p><HeritageOrnament theme="sunda" kind="emblem" className="preview-hero-emblem" /><HeroNames /></div>
      <figure className="identity-hero-photo sunda-hero-photo"><Photo theme={theme} /><HeritageOrnament theme="sunda" kind="corner" className="sunda-hero-branch sunda-hero-branch--left" /><HeritageOrnament theme="sunda" kind="corner" className="sunda-hero-branch sunda-hero-branch--right" /></figure>
      <div className="identity-hero-note"><p className="preview-hero-tagline">{theme.tagline}</p><p className="preview-date">21 AGUSTUS 2027</p><a href="#kisah" className="preview-scroll">Masuki taman cerita kami</a></div>
    </div>
  </section>;

  if (theme.slug === "palembang") return <section className="preview-hero" data-theme-composition="songket">
    <HeritageDecor theme="palembang" />
    <div className="palembang-hero-layout" data-invitation-hero-content>
      <div className="preview-hero-content"><p className="preview-kicker">{theme.eyebrow}</p><HeritageOrnament theme="palembang" className="preview-hero-emblem" /><HeroNames /><p className="preview-hero-tagline">{theme.tagline}</p></div>
      <figure className="identity-hero-photo palembang-hero-photo"><Photo theme={theme} /></figure>
      <div className="identity-hero-note"><p className="preview-date">SABTU, 21 AGUSTUS 2027</p><HeritageOrnament theme="palembang" /><a href="#kisah" className="preview-scroll">Temukan kisah kami</a></div>
    </div>
  </section>;

  return <section className="preview-hero" data-theme-composition="dual-tradition">
    <div className="mix-hero-side mix-hero-side--jawa"><HeritageDecor theme="jawa" /></div><div className="mix-hero-side mix-hero-side--sunda"><HeritageDecor theme="sunda" /></div>
    <div className="mix-hero-layout" data-invitation-hero-content>
      <div className="preview-hero-content"><p className="preview-kicker">{theme.eyebrow}</p><div className="mix-hero-sigils"><HeritageOrnament theme="jawa" kind="emblem" /><span aria-hidden="true">&amp;</span><HeritageOrnament theme="sunda" kind="emblem" /></div><HeroNames /><p className="preview-hero-tagline">{theme.tagline}</p><p className="preview-date">21 · 08 · 2027</p><a href="#kisah" className="preview-scroll">Temukan harmoni kami</a></div>
      <div className="mix-hero-photos"><figure className="identity-hero-photo mix-hero-photo--jawa"><Photo theme={theme} className="mix-photo-jawa" /><figcaption>Corak Jawa</figcaption></figure><figure className="identity-hero-photo mix-hero-photo--sunda"><Photo theme={theme} className="mix-photo-sunda" /><figcaption>Sentuhan Sunda</figcaption></figure><HeritageOrnament theme="mix" className="mix-hero-join" /></div>
    </div>
  </section>;
}

export function ThemeCouple({ theme }: { theme: Theme }) {
  const slug = theme.slug as PreviewSlug;
  const portraitTheme = (side: "a" | "b"): ThemeSlug => slug === "mix" ? side === "a" ? "jawa" : "sunda" : slug;
  return <section id="kisah" className="preview-intro preview-section" data-invitation-reveal data-theme-composition={`${slug}-couple`}>
    <HeritageDecor theme={theme.slug} />
    <div className="identity-intro-heading">
      {slug === "jawa" && <PendopoRoof />}
      {slug === "palembang" && <HeritageOrnament theme="palembang" className="identity-intro-sigil" />}
      <p className="preview-kicker">KEDUA MEMPELAI</p><h2>{themeIdentity[slug].couple}</h2><div className="preview-divider"><HeritageOrnament theme={theme.slug} /></div><p className="identity-intro-story">{theme.story}</p>
    </div>
    <div className="preview-couple">
      <article className="preview-person preview-person--a"><PortraitFrame theme={portraitTheme("a")}><div className="preview-person-photo preview-person-a" style={{ backgroundImage: `url("${theme.photo}")` }} role="img" aria-label="Aruna Putri dalam busana adat" /></PortraitFrame><div className="preview-person-caption"><small>MEMPELAI WANITA</small><h3>Aruna Putri</h3><p>Putri dari Bapak &amp; Ibu</p></div></article>
      <span className="preview-couple-amp" aria-hidden="true">&amp;</span>
      <article className="preview-person preview-person--b"><PortraitFrame theme={portraitTheme("b")}><div className="preview-person-photo preview-person-b" style={{ backgroundImage: `url("${theme.photo}")` }} role="img" aria-label="Bima Pratama dalam busana adat" /></PortraitFrame><div className="preview-person-caption"><small>MEMPELAI PRIA</small><h3>Bima Pratama</h3><p>Putra dari Bapak &amp; Ibu</p></div></article>
    </div>
  </section>;
}

export function ThemeStory({ theme }: { theme: Theme }) {
  const milestones = [
    { year: "2021", title: "Pertama berjumpa", text: "Sebuah pertemuan sederhana menjadi awal cerita." },
    { year: "2024", title: "Saling memilih", text: "Kami belajar bertumbuh dan menjaga satu sama lain." },
    { year: "2027", title: "Melangkah bersama", text: "Dengan restu keluarga, kami memulai perjalanan baru." },
  ];
  return <section className="preview-story preview-section" data-invitation-reveal data-theme-composition={`${theme.slug}-story`}><HeritageDecor theme={theme.slug} /><div className="identity-story-heading"><p className="preview-kicker">PERJALANAN KAMI</p><HeritageOrnament theme={theme.slug} kind="emblem" className="preview-heritage-story" /><h2>{themeIdentity[theme.slug as PreviewSlug].story}</h2><p>{theme.intro}</p></div><ol className="preview-story-years">{milestones.map(({ year, title, text }) => <li key={year}><time>{year}</time><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>;
}
