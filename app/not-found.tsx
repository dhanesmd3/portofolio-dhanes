import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TerminalLine } from "@/components/TerminalLine";
import { buttonStyles, labelClass, nudge } from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

const textLink =
  "text-body-sm text-fg decoration-1 underline-offset-4 transition-colors hover:underline";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-16">
        <section className="relative shell flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
          <div
            className="pointer-events-none absolute inset-0 dot-field"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center">
            <p className={labelClass}>
              <span className="text-accent">Error</span>
              <span className="text-muted"> / 404</span>
            </p>
            <h1 className="mt-6 text-display-xl text-fg">
              <span aria-hidden="true">404</span>
              <span className="sr-only">Page not found</span>
            </h1>

            <TerminalLine />

            <p className="mt-4 text-body text-muted">
              This page doesn&apos;t exist, or it moved.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link href="/" className={buttonStyles.primary}>
                Back to home
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className={nudge.right}
                  aria-hidden="true"
                />
              </Link>
              <Link href="/#projects" className={cn(textLink)}>
                Projects
              </Link>
              <Link href="/#contact" className={cn(textLink)}>
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
