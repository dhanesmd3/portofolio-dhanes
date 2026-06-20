"use client";

import { profile } from "@/lib/data";
import { useImagePreload } from "@/hooks/useImagePreload";

const initials = profile.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function ProfilePhoto({ size = "h-24 w-24" }: { size?: string }) {
  const loaded = useImagePreload(profile.photoUrl);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border-2 border-line-600 bg-ink-800 ${size}`}
    >
      {loaded ? (
        <div
          role="img"
          aria-label={`Foto ${profile.name}`}
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.photoUrl})` }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-2xl font-semibold text-paper-400">
          {initials}
        </div>
      )}
    </div>
  );
}
