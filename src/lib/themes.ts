export type ThemeSlug = "keraton-jawa" | "jawa" | "sunda" | "palembang" | "mix";

export type Theme = {
  slug: ThemeSlug;
  name: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  story: string;
  motif: string;
  photo: string;
  photoPosition?: string;
  palette: string;
  opening: "envelope" | "lift" | "gate";
};

export const themes: Theme[] = [
  {
    slug: "keraton-jawa",
    name: "Keraton Jawa",
    eyebrow: "ADILUHUNG • KERATON JAWA",
    tagline: "Keanggunan warisan, dalam sebuah perayaan cinta.",
    intro: "Gunungan, gebyok, dan rona emas untuk kisah yang penuh makna.",
    story: "Sebuah undangan dengan sentuhan keraton yang hangat dan khidmat.",
    motif: "꧋",
    photo: "/themes/keraton-jawa.webp",
    photoPosition: "center 40%",
    palette: "#271910",
    opening: "gate",
  },
  {
    slug: "jawa",
    name: "Jawa",
    eyebrow: "KISAH JAWA • SAKLAWASE",
    tagline: "Sederhana, hangat, dan selalu terkenang.",
    intro: "Nuansa tanah, corak batik, serta cerita dua hati yang berpadu.",
    story: "Dari sebuah pertemuan sederhana, tumbuh doa untuk melangkah bersama selamanya.",
    motif: "✦",
    photo: "/themes/jawa.webp",
    photoPosition: "center 45%",
    palette: "#af614b",
    opening: "envelope",
  },
  {
    slug: "sunda",
    name: "Sunda",
    eyebrow: "TAMAN ASIH • SUNDA",
    tagline: "Mekar dalam kasih, bersemi dalam doa.",
    intro: "Hijau yang teduh, bunga lembut, dan suasana yang menyambut.",
    story: "Di antara harapan keluarga dan doa sahabat, kami memilih untuk saling menjaga.",
    motif: "❀",
    photo: "/themes/sunda.webp",
    photoPosition: "center 46%",
    palette: "#66785b",
    opening: "lift",
  },
  {
    slug: "palembang",
    name: "Palembang",
    eyebrow: "PESONA PALEMBANG • SONGKET",
    tagline: "Cinta yang dirayakan dengan kemilau tradisi.",
    intro: "Rona marun, aksen emas, dan kemegahan yang terasa intim.",
    story: "Dengan restu kedua keluarga, kami menyatukan langkah dan merayakan awal kisah baru.",
    motif: "✧",
    photo: "/themes/palembang.webp",
    photoPosition: "center 50%",
    palette: "#752e39",
    opening: "envelope",
  },
  {
    slug: "mix",
    name: "Mix Jawa & Sunda",
    eyebrow: "DUA TRADISI • SATU CERITA",
    tagline: "Dua akar, satu perjalanan bersama.",
    intro: "Perpaduan hangatnya Jawa dan lembutnya Sunda dalam satu undangan.",
    story: "Dua keluarga, dua tradisi, dan sebuah keputusan untuk menulis masa depan bersama.",
    motif: "❈",
    photo: "/themes/mix.webp",
    photoPosition: "center 45%",
    palette: "#8e7c6b",
    opening: "gate",
  },
];

export const otherThemes = themes.filter((theme) => theme.slug !== "keraton-jawa");

export function getTheme(slug: string): Theme | undefined {
  return themes.find((theme) => theme.slug === slug);
}
