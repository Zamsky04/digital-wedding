"use client";

import Link from "next/link";
import { useState } from "react";
import { themes } from "@/lib/themes";

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 190" className={className} fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M-9 182C75 154 62 68 151 6M27 168c26-19 29-39 28-60m10 28c24 5 33-6 44-27M81 89C59 76 61 58 64 47m28 28c29-4 37-17 45-31" />
      <path d="M31 165c-12-16-27-17-35-12m55-29c-6-16-1-25 13-36m25-10C77 55 78 43 88 31m16 36c5-20 20-22 35-19" />
      <path d="M105 51c-15-7-13-21 0-23 8-15 20-9 21 3 15 3 16 16 3 21-2 15-15 15-23 5Z" />
      <path d="M21 153c-13-6-15-19-2-23 6-12 17-7 18 3 13 5 13 15 2 18-1 12-10 14-18 2ZM66 104c-11-5-10-16 0-19 6-11 15-6 15 2 11 3 12 12 2 16-1 11-10 12-17 1Z" />
      <circle cx="117" cy="41" r="4" /><circle cx="29" cy="143" r="3" /><circle cx="74" cy="95" r="3" />
      <path d="M48 150c15-1 20-12 22-23M78 96c-1-16 6-23 16-29" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: "gallery" | "rsvp" | "map" }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" width="29" height="29" {...shared}>
      {type === "gallery" && <><rect x="4" y="5" width="24" height="22" rx="2" /><circle cx="11" cy="12" r="2" /><path d="m6 24 8-8 4 4 4-4 5 6" /></>}
      {type === "rsvp" && <><circle cx="16" cy="10" r="4" /><path d="M7 26v-2a9 9 0 0 1 18 0v2H7ZM4 12a3 3 0 0 0-1 5m25-5a3 3 0 0 1 1 5" /></>}
      {type === "map" && <><path d="M25 13c0 7-9 15-9 15S7 20 7 13a9 9 0 0 1 18 0Z" /><circle cx="16" cy="13" r="3" /></>}
    </svg>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link className="brand" href="/" aria-label="Undangan Digital, kembali ke beranda">UNDANGAN DIGITAL</Link>
          <nav id="landing-navigation" aria-label="Navigasi utama" className={menuOpen ? "landing-nav is-open" : "landing-nav"}>
            <a href="#keunggulan" onClick={() => setMenuOpen(false)}>Keunggulan</a>
            <a href="#tema" onClick={() => setMenuOpen(false)}>Tema</a>
            <a className="nav-cta" href="#tema" onClick={() => setMenuOpen(false)}>Lihat Tema</a>
          </nav>
          <button type="button" className="menu-button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-controls="landing-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="hero-title">
          <FloralCorner className="floral hero-floral-left" />
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-line" /> UNTUK HARI PALING BERARTI</span>
              <h1 id="hero-title">Setiap cinta punya kisah.<br /><em>Rayakan dengan cara istimewa.</em></h1>
              <p>Undangan digital yang dipersonalisasi untuk cerita cinta kalian. Lebih dari sekadar undangan, sebuah pengalaman yang bermakna.</p>
              <a className="primary-button" href="#tema">Jelajahi Tema</a>
            </div>
            <div className="hero-visual" aria-label="Contoh tampilan undangan digital bernuansa pernikahan">
              <div className="hero-photo" />
              <div className="hero-phone" aria-hidden="true">
                <div className="phone-photo" />
                <div className="phone-overlay">
                  <span>THE WEDDING OF</span>
                  <strong>Aruna <i>&</i> Bima</strong>
                  <small>21 . 12 . 2026</small>
                </div>
              </div>
              <div className="hero-visual-flower" aria-hidden="true">❀</div>
            </div>
          </div>
          <FloralCorner className="floral hero-floral-right" />
        </section>

        <section id="keunggulan" className="features-section" aria-labelledby="features-title">
          <span className="section-kicker">DIBUAT UNTUK KISAH KALIAN</span>
          <h2 id="features-title">Momen indah, dibagikan dengan mudah.</h2>
          <div className="section-flourish" aria-hidden="true">✣</div>
          <div className="feature-grid">
            <article className="feature-item"><span className="feature-icon"><FeatureIcon type="gallery" /></span><h3>Cerita &amp; Galeri</h3><p>Bagikan perjalanan cinta lewat foto dan cerita.</p></article>
            <article className="feature-item"><span className="feature-icon"><FeatureIcon type="rsvp" /></span><h3>RSVP Tamu</h3><p>Undang tamu untuk menyampaikan konfirmasi kehadiran.</p></article>
            <article className="feature-item"><span className="feature-icon"><FeatureIcon type="map" /></span><h3>Lokasi Acara</h3><p>Petunjuk menuju tempat perayaan langsung dari undangan.</p></article>
          </div>
        </section>

        <section id="tema" className="themes-section" aria-labelledby="themes-title">
          <FloralCorner className="floral themes-floral-left" />
          <span className="section-kicker">PILIH YANG PALING KALIAN</span>
          <h2 id="themes-title">Temukan tema untuk kisah kalian.</h2>
          <p className="themes-subtitle">Lihat pengalaman masing-masing undangan sebelum menentukan gaya yang paling dekat dengan hati.</p>
          <div className="theme-grid">
            {themes.map((theme) => (
              <Link key={theme.slug} href={`/tema/${theme.slug}`} className={`theme-card theme-card--${theme.slug}`} aria-label={`Lihat contoh undangan tema ${theme.name}`}>
                <span className="theme-card-photo" style={{ backgroundImage: `url("${theme.photo}")`, backgroundPosition: theme.photoPosition }} />
                <span className="theme-card-ornament" aria-hidden="true">{theme.motif}</span>
                <span className="theme-card-shade" />
                <span className="theme-card-content"><span className="theme-card-label">CONTOH UNDANGAN</span><strong>{theme.slug === "mix" ? "Mix" : theme.name}</strong>{theme.slug === "mix" && <small>Jawa &amp; Sunda</small>}<span className="theme-card-link">Lihat contoh</span></span>
              </Link>
            ))}
          </div>
          <FloralCorner className="floral themes-floral-right" />
        </section>
      </main>
      <footer className="landing-footer"><span>UNDANGAN DIGITAL</span><span>Setiap kisah layak dirayakan dengan indah.</span><a href="#hero-title">Kembali ke atas</a></footer>
    </div>
  );
}
