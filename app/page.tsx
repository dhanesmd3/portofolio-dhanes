import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Tools } from "@/components/Tools";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { BeyondTech } from "@/components/BeyondTech";
import { Contact } from "@/components/Contact";
import { CompactView } from "@/components/CompactView";
import { Footer } from "@/components/Footer";
import { personJsonLd, toJsonLdString } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      {/* Data terstruktur untuk Google (siapa pemilik halaman ini) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdString(personJsonLd()) }}
      />
      <Navbar />
      <main id="main">
        {/* Dua tampilan dirender sekaligus; CSS (data-view di <html>) yang
            memilih mana yang tampil, jadi tidak ada kedip saat reload */}
        <div className="compact:hidden">
          <Hero />
          <Tools />
          <Projects />
          <Experience />
          <BeyondTech />
          <Contact />
        </div>
        <div className="hidden compact:block">
          <CompactView />
        </div>
      </main>
      <Footer />
    </>
  );
}
