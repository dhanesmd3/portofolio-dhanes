"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/lib/data";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getTime = () => formatter.format(new Date());
// Di server jam belum diketahui (dan bakal beda dengan browser) → tampilkan --:--
const getServerTime = () => null;

/** Jam lokal Bandung, update tiap menit. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return (
    <p>
      Bandung <time>{time ?? "--:--"}</time> {profile.timeZoneLabel}
    </p>
  );
}
