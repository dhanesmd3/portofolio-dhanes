import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";

// Gambar preview saat link dibagikan (Google, WhatsApp, LinkedIn, X).
// Dipakai juga untuk Twitter/X karena tidak ada twitter-image terpisah.
export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Monogram ᗡMD (geometri sama dengan components/Logo.tsx)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path stroke="#eef1f6" d="M18 2.5h-5.5a9.5 9.5 0 0 0 0 19H18z"/><path stroke="#4a7be3" d="M24 21.5v-19l8 12 8-12v19"/><path stroke="#eef1f6" d="M46 2.5h5.5a9.5 9.5 0 0 1 0 19H46z"/></svg>`;
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

const host = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
// "Dhanesworo Muhammad Datiputro" → "Dhanes" + "woro" / "Muhammad Datiputro"
const [firstWord, ...rest] = profile.name.split(" ");
const firstWordRest = firstWord.slice(profile.nickname.length);
const otherNames = rest.join(" ");

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(74,123,227,0.28), rgba(11,13,18,0) 70%), #0b0d12",
        color: "#eef1f6",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse butuh <img> biasa */}
      <img src={logoSrc} width={128} height={48} alt="" />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Dua baris: "Dhanesworo" / "Muhammad Datiputro" supaya muat */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 80,
            letterSpacing: -1,
            lineHeight: 1.05,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ color: "#4a7be3" }}>{profile.nickname}</span>
            <span>{firstWordRest}</span>
          </div>
          <span>{otherNames}</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 34, color: "#969db0" }}>
          {profile.tagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#969db0",
          borderTop: "1px solid #1c2130",
          paddingTop: 28,
        }}
      >
        <span>Projects · Experience · Achievements</span>
        <span style={{ color: "#eef1f6" }}>{host}</span>
      </div>
    </div>,
    { ...size },
  );
}
