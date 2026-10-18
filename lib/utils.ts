/** Gabung class Tailwind secara kondisional, abaikan nilai falsy. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
