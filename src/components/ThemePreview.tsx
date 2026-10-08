"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Theme } from "@/lib/themes";
import { display } from "@/lib/fonts";
import InvitationCover from "./InvitationCover";
import { useInvitationOpening, useInvitationReveals } from "./useInvitationOpening";
import "./theme-preview.css";
import { HeritageDecor, HeritageOrnament } from "./HeritageOrnaments";
import { ThemeHero, ThemeCouple, ThemeStory, themeIdentity } from "./ThemeIdentity";

const TARGET = new Date("2027-08-21T09:00:00+07:00").getTime();
const VENUES: Record<string, { name: string; address: string }> = {
  jawa: { name: "Pendopo Taman Sari", address: "Yogyakarta, Daerah Istimewa Yogyakarta" },
  sunda: { name: "Taman Sari Bandung", address: "Bandung, Jawa Barat" },
  palembang: { name: "Gedung Kesenian Palembang", address: "Palembang, Sumatera Selatan" },
  mix: { name: "Pendopo Harmoni", address: "Jakarta Selatan, DKI Jakarta" },
};

function useCountdown() {
  const [difference, setDifference] = useState(0);
  useEffect(() => {
    const tick = () => setDifference(Math.max(0, TARGET - Date.now()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return [
    { label: "Hari", value: Math.floor(difference / 86_400_000) },
    { label: "Jam", value: Math.floor((difference / 3_600_000) % 24) },
    { label: "Menit", value: Math.floor((difference / 60_000) % 60) },
    { label: "Detik", value: Math.floor((difference / 1000) % 60) },
  ];
}

export default function ThemePreview({ theme, guestName }: { theme: Theme; guestName: string }) {
  const experience = useInvitationOpening(theme.opening);
  const { opened, mainRef, phase } = experience;
  useInvitationReveals(experience);
  const [rsvpName, setRsvpName] = useState("");
  const [attendance, setAttendance] = useState("hadir");
  const [submitted, setSubmitted] = useState(false);
  const countdown = useCountdown();
  const venue = VENUES[theme.slug];
  const identity = themeIdentity[theme.slug as keyof typeof themeIdentity];

  return (
    <div className={`${display.variable} preview preview--${theme.slug}`} data-invitation-state={phase}>
      {opened && <Link className="invitation-back" href="/#tema" aria-label="Kembali ke daftar tema">Semua tema</Link>}
      {!opened && <InvitationCover theme={theme} guestName={guestName} experience={experience} />}
      <main ref={mainRef} className="invitation-main" tabIndex={-1} inert={!opened} aria-hidden={!opened} aria-label="Isi undangan pernikahan Aruna dan Bima">
        <ThemeHero theme={theme} />
        <ThemeCouple theme={theme} />
        <ThemeStory theme={theme} />

        <section id="acara" className="preview-events preview-section" data-invitation-reveal><HeritageDecor theme={theme.slug} /><p className="preview-kicker">WAKTU PERAYAAN</p><h2>{identity.events}</h2><p className="preview-event-date">Sabtu, 21 Agustus 2027</p><div className="preview-event-grid"><article><HeritageOrnament theme={theme.slug} className="preview-event-ornament" /><span>01</span><h3>Akad Nikah</h3><p>09.00 – 10.00 WIB</p></article><article><HeritageOrnament theme={theme.slug} className="preview-event-ornament" /><span>02</span><h3>Resepsi</h3><p>11.00 – 14.00 WIB</p></article></div><div className="preview-countdown" aria-label="Hitung mundur menuju acara">{countdown.map(({ label, value }) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div></section>

        <section className="preview-gallery preview-section" data-invitation-reveal><HeritageDecor theme={theme.slug} /><p className="preview-kicker">POTONGAN KISAH</p><h2>{identity.gallery}</h2><div className="preview-gallery-grid">{[1, 2, 3].map((index) => <div key={index} className={`preview-gallery-image preview-gallery-image-${index}`} style={{ backgroundImage: `url("${theme.photo}")` }} role="img" aria-label={`Pratinjau foto pasangan tema ${theme.name}, potongan ${index}`} />)}</div></section>

        <section className="preview-location preview-section" data-invitation-reveal><HeritageDecor theme={theme.slug} /><p className="preview-kicker">LOKASI PERAYAAN</p><h2>{identity.location}</h2><div className="preview-location-card"><HeritageOrnament theme={theme.slug} kind="emblem" className="preview-location-emblem" /><h3>{venue.name}</h3><p>{venue.address}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address}`)}`} target="_blank" rel="noopener noreferrer">Buka petunjuk arah</a></div></section>

        <section className="preview-rsvp preview-section" data-invitation-reveal><HeritageDecor theme={theme.slug} /><div className="identity-rsvp-heading"><p className="preview-kicker">KONFIRMASI KEHADIRAN</p><h2>{identity.rsvp}</h2><HeritageOrnament theme={theme.slug} /><p>Isi contoh formulir untuk melihat tampilan RSVP undangan.</p></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label htmlFor={`name-${theme.slug}`}>Nama tamu</label><input id={`name-${theme.slug}`} name="name" placeholder="Nama lengkap" value={rsvpName} onChange={(event) => { setRsvpName(event.target.value); setSubmitted(false); }} maxLength={80} required /><label htmlFor={`attendance-${theme.slug}`}>Konfirmasi</label><select id={`attendance-${theme.slug}`} value={attendance} onChange={(event) => setAttendance(event.target.value)}><option value="hadir">Saya akan hadir</option><option value="tidak">Maaf, belum bisa hadir</option></select><button type="submit">Lihat konfirmasi</button>{submitted && <p className="preview-form-result" role="status">Terima kasih, {rsvpName}! Pilihan “{attendance === "hadir" ? "Saya akan hadir" : "Maaf, belum bisa hadir"}” tampil sebagai pratinjau. Data tidak dikirim atau disimpan.</p>}</form></section>

        <footer className="preview-footer" data-invitation-reveal><HeritageDecor theme={theme.slug} /><HeritageOrnament theme={theme.slug} kind="emblem" className="preview-footer-emblem" /><p>Dengan penuh rasa syukur,</p><strong>Aruna <em>&amp;</em> Bima</strong><p>21 Agustus 2027</p><Link href="/#tema">Jelajahi tema lainnya</Link></footer>
      </main>
    </div>
  );
}
