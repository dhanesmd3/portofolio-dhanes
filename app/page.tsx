import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Tools } from "@/components/Tools";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { BeyondTech } from "@/components/BeyondTech";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Tools />
        <Projects />
        <Experience />
        <BeyondTech />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
