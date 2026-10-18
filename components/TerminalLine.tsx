"use client";

import { usePathname } from "next/navigation";

/** Baris gaya terminal di halaman 404, menampilkan path yang dicari. */
export function TerminalLine() {
  const pathname = usePathname();
  return (
    <p className="mt-8 font-mono text-sm break-all text-muted">
      <span className="text-fg">$</span> cd {pathname}
      <br />
      <span aria-hidden="true">→</span> no such file or directory
    </p>
  );
}
