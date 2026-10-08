import { useId, type ReactNode } from "react";
import type { ThemeSlug } from "@/lib/themes";
import "./heritage-ornaments.css";

// Original, simplified line art inspired by the traditions of each theme.
function Kawung() {
  return <g><ellipse cx="-9" cy="-9" rx="6" ry="12" transform="rotate(-45 -9 -9)" /><ellipse cx="9" cy="-9" rx="6" ry="12" transform="rotate(45 9 -9)" /><ellipse cx="-9" cy="9" rx="6" ry="12" transform="rotate(45 -9 9)" /><ellipse cx="9" cy="9" rx="6" ry="12" transform="rotate(-45 9 9)" /><circle r="2" fill="currentColor" /></g>;
}

function Blossom() {
  return <g><path d="M0-20C13-31 19-15 11-7C30-10 30 10 11 8C20 24 4 31 0 15C-5 31-20 24-11 8C-30 10-30-10-11-7C-19-15-13-31 0-20Z" /><circle r="5" /><circle r="2" fill="currentColor" /></g>;
}

function Kujang() {
  return <g><path d="M-4 24C-9 10-4 1 5-10C9-16 9-24 6-30C22-21 20-11 10-4C5 0 6 6 13 4C10 16 4 19 0 22L1 31L-6 31Z" fill="currentColor" fillOpacity=".12" /><circle cx="10" cy="-17" r="1.5" fill="currentColor" /><circle cx="8" cy="-11" r="1.2" fill="currentColor" /></g>;
}

function Kayon() {
  return <g><path d="M0-32C-3-20-14-11-18 2C-22 14-14 20-25 26Q0 38 25 26C14 20 22 14 18 2C14-11 3-20 0-32Z" fill="currentColor" fillOpacity=".1" /><path d="M0-18V27M0-2Q-8-12-12-6M0-2Q8-12 12-6M0 10Q-14 0-16 7M0 10Q14 0 16 7M-17 25H17" /><circle cy="16" r="4" /></g>;
}

function Songket() {
  return <g><path d="M0-29L18 7H-18ZM0-18L10 3H-10ZM0 7L17 24L0 35L-17 24Z" fill="currentColor" fillOpacity=".1" /><path d="M0 13L10 23L0 29L-10 23ZM-25 17L-20 22L-25 27L-30 22ZM25 17L30 22L25 27L20 22Z" /></g>;
}

function Emblem({ theme }: { theme: ThemeSlug }) {
  if (theme === "keraton-jawa") return <Kayon />;
  if (theme === "jawa") return <Kawung />;
  if (theme === "sunda") return <Kujang />;
  if (theme === "palembang") return <Songket />;
  return <g><g transform="translate(-19 0) scale(.72)"><Kawung /></g><g transform="translate(20 0) scale(.72)"><Kujang /></g><path d="M-3 20Q0 24 3 20" /></g>;
}

function Vine() {
  return <g><path d="M4 141C37 124 22 97 52 73C76 54 75 28 111 12M25 117C0 115 5 96 26 101M39 90C68 102 80 79 60 72M62 57C34 56 40 35 62 43M82 34C107 48 124 30 107 18" /><path d="M14 133C34 143 45 130 39 119M50 79C21 72 19 56 32 51M76 42C67 17 87 10 93 26" /><g transform="translate(114 13) scale(.55)"><Blossom /></g><g transform="translate(25 106) scale(.26)"><Blossom /></g><g transform="translate(61 44) scale(.25)"><Blossom /></g></g>;
}

function BatikCorner() {
  return <g><path d="M8 144V8H144M17 127V17H127" /><path d="M27 95C14 82 34 58 45 70C57 83 40 106 27 95ZM55 66C42 53 63 29 75 41C87 54 67 79 55 66ZM83 37C70 24 91 0 103 12C115 25 95 49 83 37" /><path d="M27 117L43 101M55 87L70 72M86 57L101 42M35 132L39 124L43 132L39 140Z" /></g>;
}

function RoyalCorner() {
  return <g><path d="M6 146V6H146M14 132V14H132M22 100V22H100" /><path d="M22 123C61 115 45 68 78 52C104 40 97 14 123 14M22 102C46 118 63 94 49 82C38 73 26 89 38 94M57 75C81 86 98 65 85 54C73 46 63 60 74 65M89 41C115 49 128 25 111 20M34 119Q58 128 67 110M74 66Q95 80 107 58M34 59L45 48L56 59L45 70ZM106 106L113 99L120 106L113 113Z" /><g transform="translate(100 112) scale(.47)"><Kayon /></g></g>;
}

function Divider({ theme }: { theme: ThemeSlug }) {
  if (theme === "keraton-jawa") return <g><path d="M-146 3H-51M51 3H146M-134 8H-62M62 8H134M-47 4C-74-28-92-21-100-12C-108-3-91 11-83 2C-78-4-86-10-92-6M47 4C74-28 92-21 100-12C108-3 91 11 83 2C78-4 86-10 92-6M-121 0Q-113-20-103-14M121 0Q113-20 103-14" /><circle cx="-146" cy="3" r="2" /><circle cx="146" cy="3" r="2" /></g>;
  if (theme === "jawa") return <g><path d="M-154-8H-44M44-8H154M-154 8H-44M44 8H154" />{[-137,-114,-91,-68,68,91,114,137].map(x=><path key={x} d={`M${x-7} 6L${x+5}-6M${x-2} 6L${x+10}-6`} />)}</g>;
  if (theme === "palembang") return <g><path d="M-155 15H-44M44 15H155M-155 21H-44M44 21H155" />{[-138,-111,-84,-57,57,84,111,138].map(x=><path key={x} d={`M${x-11} 11L${x}-14L${x+11} 11ZM${x-5} 6L${x}-5L${x+5} 6Z`} />)}</g>;
  if (theme === "sunda") return <g><path d="M-145 12Q-106-27-48 4M145 12Q106-27 48 4M-129 1Q-143-16-127-19Q-112-12-120-5M129 1Q143-16 127-19Q112-12 120-5M-89-7Q-101-27-85-26Q-74-20-81-9M89-7Q101-27 85-26Q74-20 81-9" /><g transform="translate(-58 0) scale(.28)"><Blossom /></g><g transform="translate(58 0) scale(.28)"><Blossom /></g></g>;
  return <g><path d="M-148-8H-49M-148 8H-49M49 7Q94-22 148 7" />{[-130,-107,-84,-61].map(x=><path key={x} d={`M${x-5} 6L${x+5}-6`} />)}<g transform="translate(110 -4) scale(.25)"><Blossom /></g></g>;
}

export function HeritageOrnament({ theme, kind = "divider", className = "" }: {
  theme: ThemeSlug;
  kind?: "divider" | "emblem" | "corner";
  className?: string;
}) {
  if (kind === "corner") return <svg className={`heritage-corner ${className}`} viewBox="0 0 155 155" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
    {theme === "palembang" ? <g><path d="M6 149V6H149M13 139V13H139" /><path d="M19 124L19 40L39 80ZM40 19L124 19L80 39ZM25 25L42 42L25 59L8 42Z" /><g transform="translate(68 68) scale(.8)"><Songket /></g></g> : theme === "jawa" ? <BatikCorner /> : theme === "keraton-jawa" ? <RoyalCorner /> : theme === "mix" ? <><g transform="scale(.64)"><BatikCorner /></g><g transform="translate(50 48) scale(.67)"><Vine /></g></> : <><Vine /><g transform="translate(111 97) scale(.6)"><Kujang /></g></>}
  </svg>;
  return <svg className={`heritage-ornament heritage-ornament--${kind} ${className}`} viewBox={kind === "emblem" ? "-45 -42 90 84" : "-160 -42 320 84"} fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
    {kind === "divider" && <Divider theme={theme} />}
    <Emblem theme={theme} />
  </svg>;
}

export function HeritagePattern({ theme, className = "" }: { theme: ThemeSlug; className?: string }) {
  const id = `heritage-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return <svg className={`heritage-pattern ${className}`} width="100%" height="100%" aria-hidden="true" focusable="false">
    <defs><pattern id={id} width="76" height="76" patternUnits="userSpaceOnUse"><g fill="none" stroke="currentColor" strokeWidth=".7">
      {theme === "palembang" ? <><path d="M0 38L38 0L76 38L38 76ZM10 38L38 10L66 38L38 66ZM28 38L38 28L48 38L38 48Z" /><path d="M0 0L12 0L0 12M76 76H64L76 64" /></> : theme === "sunda" ? <><path d="M0 38Q38 12 76 38M38 0Q12 38 38 76" /><g transform="translate(38 38) scale(.28)"><Blossom /></g></> : theme === "jawa" ? <><path d="M-12 68C-28 50-7 18 10 34C26 50 2 87-12 68M26 30C10 12 31-20 48-4C64 12 40 49 26 30M64 68C48 50 69 18 86 34C102 50 78 87 64 68" /><path d="M7 13L15 5M45 51L53 43" /></> : theme === "mix" ? <><g transform="translate(22 38) scale(.57)"><Kawung /></g><g transform="translate(60 38) scale(.35)"><Blossom /></g><path d="M41 0V76" /></> : <>{[[19,19],[57,57]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0-8V8M-8 0H8M-5-5L5 5M-5 5L5-5" /><circle r="2" /></g>)}</>}
    </g></pattern></defs><rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>;
}

export function HeritageDecor({ theme }: { theme: ThemeSlug }) {
  return <div className={`heritage-decor heritage-decor--${theme}`} aria-hidden="true"><HeritagePattern theme={theme} /><HeritageOrnament theme={theme} kind="corner" className="heritage-corner--start" /><HeritageOrnament theme={theme} kind="corner" className="heritage-corner--end" /></div>;
}

export function PortraitFrame({ theme, children, className = "" }: { theme: ThemeSlug; children: ReactNode; className?: string }) {
  if (theme === "jawa") return <div className={`heritage-portrait heritage-portrait--jawa ${className}`}><div className="heritage-portrait-image">{children}</div><HeritageOrnament theme="jawa" kind="corner" className="portrait-batik-corner portrait-batik-corner--start" /><HeritageOrnament theme="jawa" kind="corner" className="portrait-batik-corner portrait-batik-corner--end" /><HeritageOrnament theme="jawa" className="portrait-batik-band" /></div>;
  if (theme === "sunda") return <div className={`heritage-portrait heritage-portrait--sunda ${className}`}><div className="heritage-portrait-image">{children}</div><HeritageOrnament theme="sunda" kind="corner" className="portrait-garden-branch portrait-garden-branch--left" /><HeritageOrnament theme="sunda" kind="corner" className="portrait-garden-branch portrait-garden-branch--right" /></div>;
  if (theme === "palembang") return <div className={`heritage-portrait heritage-portrait--palembang ${className}`}><div className="heritage-portrait-image">{children}</div><HeritageOrnament theme="palembang" className="portrait-songket-band portrait-songket-band--top" /><HeritageOrnament theme="palembang" className="portrait-songket-band portrait-songket-band--bottom" /></div>;
  return <div className={`heritage-portrait heritage-portrait--${theme} ${className}`}>
    <HeritageOrnament theme={theme} className="heritage-portrait-crown" />
    <div className="heritage-portrait-image">{children}</div>
    <HeritageOrnament theme={theme} kind="corner" className="heritage-portrait-leaf heritage-portrait-leaf--left" />
    <HeritageOrnament theme={theme} kind="corner" className="heritage-portrait-leaf heritage-portrait-leaf--right" />
    <div className="heritage-portrait-foot" aria-hidden="true"><HeritageOrnament theme={theme} /></div>
  </div>;
}
