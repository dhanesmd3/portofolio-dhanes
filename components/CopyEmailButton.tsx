"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { labelClass } from "./ui";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard diblokir browser — link mailto di sebelahnya tetap bisa dipakai
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-150 hover:border-line-strong hover:text-fg"
        aria-label="Copy email address"
      >
        {copied ? (
          <Check size={14} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Copy size={14} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
      <span
        role="status"
        className={cn(labelClass, "text-muted", !copied && "sr-only")}
      >
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
