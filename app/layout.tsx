import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { Backdrop } from "@/components/Backdrop";
import { MotionProvider } from "@/components/MotionProvider";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description = `${profile.tagline}. ${profile.bio}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.tagline}`,
    template: `%s · ${profile.wordmark}`,
  },
  description,
  openGraph: {
    type: "website",
    title: profile.name,
    description,
    url: "/",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6f9" },
  ],
};

// Jalan sebelum halaman ke-render: pasang tema & tampilan (Full/Compact)
// yang tersimpan supaya tidak ada "kedip" yang salah saat reload.
const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),v=localStorage.getItem("view");if(t==="light"||t==="dark")d.dataset.theme=t;if(v==="full"||v==="compact")d.dataset.view=v}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-view="full"
      suppressHydrationWarning
      className={`${schibsted.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas text-fg">
        <a
          href="#main"
          className="sr-only rounded-full bg-action-bg px-4 py-2 text-sm text-action-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <Backdrop />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
