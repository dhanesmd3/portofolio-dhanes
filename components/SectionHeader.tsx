import { labelClass } from "./ui";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  titleId: string;
  // Konten opsional di kanan (intro singkat atau kontrol carousel)
  aside?: React.ReactNode;
};

/** Garis 1px + "01 / LABEL" + judul. Ini yang membentuk struktur halaman. */
export function SectionHeader({
  index,
  label,
  title,
  titleId,
  aside,
}: SectionHeaderProps) {
  return (
    <div className="border-t border-line pt-6">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={labelClass}>
            <span className="text-accent">{index}</span>
            <span className="text-muted"> / {label}</span>
          </p>
          <h2 id={titleId} className="mt-4 text-heading-lg text-fg">
            {title}
          </h2>
        </div>
        {aside}
      </Reveal>
    </div>
  );
}
