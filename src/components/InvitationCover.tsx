"use client";

import Link from "next/link";
import type { Theme } from "@/lib/themes";
import type { InvitationOpening } from "./useInvitationOpening";
import { HeritageDecor, HeritageOrnament, HeritagePattern } from "./HeritageOrnaments";
import "./theme-cover-identity.css";

function Names({ title = false }: { title?: boolean }) {
  const Tag = title ? "h1" : "p";
  return <Tag className="cover-names" id={title ? "invitation-cover-title" : undefined}>Aruna <span>&amp;</span> Bima</Tag>;
}

export default function InvitationCover({ theme, guestName, experience }: {
  theme: Theme;
  guestName: string;
  experience: InvitationOpening;
}) {
  const { coverRef, phase, open } = experience;
  const envelope = theme.opening === "envelope";

  return (
    <div ref={coverRef} className={`invitation-cover invitation-cover--${theme.opening} invitation-cover--${theme.slug}`}
      data-opening-phase={phase} role="dialog" aria-modal="true" aria-labelledby="invitation-cover-title" aria-busy={phase === "opening"}>
      <div className="cover-backdrop" data-opening-backdrop>
        <div className="cover-photo" style={{ backgroundImage: `url("${theme.photo}")`, backgroundPosition: theme.photoPosition }} />
        <div className="cover-shade" />
      </div>

      {theme.opening !== "gate" && <HeritageDecor theme={theme.slug} />}

      {theme.opening === "gate" && <div className="cover-panels" aria-hidden="true">
        <div className="cover-panel cover-panel-left" data-opening-panel data-opening-panel-left><HeritagePattern theme="jawa" /><HeritageOrnament theme="jawa" kind="corner" className="cover-panel-flourish" /></div>
        <div className="cover-panel cover-panel-right" data-opening-panel data-opening-panel-right><HeritagePattern theme="sunda" /><HeritageOrnament theme="sunda" kind="corner" className="cover-panel-flourish" /></div>
      </div>}

      <Link className="invitation-back" href="/#tema" aria-label="Kembali ke daftar tema">Semua tema</Link>

      <div className="invitation-cover-body" data-opening-content={envelope ? undefined : ""}>
        <p className="cover-eyebrow" data-opening-controls>{theme.eyebrow}</p>

        {envelope ? <div className="cover-art envelope-scene" aria-hidden="true">
          <div className="envelope">
            <div className="envelope-base" />
            <div className="envelope-letter" data-envelope-letter>
              <HeritageOrnament theme={theme.slug} kind="emblem" className="envelope-letter-motif" />
              <p className="cover-kicker">UNDANGAN PERNIKAHAN</p>
              <Names />
              <p className="cover-date">21 · 08 · 2027</p>
            </div>
            <div className="envelope-pocket" data-envelope-pocket><HeritagePattern theme={theme.slug} className="envelope-textile" /></div>
            <div className="envelope-flap" data-envelope-flap><HeritagePattern theme={theme.slug} /></div>
            <span className="envelope-seal" data-envelope-seal><HeritageOrnament theme={theme.slug} kind="emblem" /></span>
            <div className="envelope-address" data-envelope-address>
              <p className="cover-kicker">UNDANGAN PERNIKAHAN</p>
              <Names />
              <p className="cover-date">21 · 08 · 2027</p>
            </div>
          </div>
        </div> : <div className="cover-art cover-card">
          <HeritageOrnament theme={theme.slug === "mix" ? "sunda" : theme.slug} kind="corner" className="cover-flourish cover-flourish-top" />
          <HeritageOrnament theme={theme.slug} kind="emblem" className="cover-motif" />
          <p className="cover-kicker">UNDANGAN PERNIKAHAN</p>
          <Names title />
          <p className="cover-date">21 AGUSTUS 2027</p>
          <HeritageOrnament theme={theme.slug === "mix" ? "jawa" : theme.slug} kind="corner" className="cover-flourish cover-flourish-bottom" />
          {theme.slug === "mix" && <p className="cover-traditions">Jawa · Sunda</p>}
        </div>}

        {envelope && <h1 className="sr-only" id="invitation-cover-title">Undangan pernikahan Aruna dan Bima</h1>}

        <div className="cover-guest" data-opening-controls>
          <p>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <strong>{guestName}</strong>
        </div>
        <button className="cover-open-button" data-opening-button data-opening-controls type="button" disabled={phase !== "closed"} onClick={open}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
          <span>Buka Undangan</span>
        </button>
        <p className="cover-note" data-opening-controls>Dengan penuh kasih, kami mengundang Anda.</p>
      </div>
    </div>
  );
}
