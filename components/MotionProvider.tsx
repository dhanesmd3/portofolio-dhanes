"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user": kalau pengunjung menyalakan "reduce motion" di OS,
// animasi gerak (transform) dimatikan — fade opacity tetap jalan.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
