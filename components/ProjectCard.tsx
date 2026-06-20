"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { useImagePreload } from "@/hooks/useImagePreload";

export function ProjectCard({ project }: { project: Project }) {
  const previewLoaded = useImagePreload(project.previewImage);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line-700 bg-ink-900 transition-colors duration-200 hover:border-line-600">
      {/* Mockup placeholder ala browser window — otomatis ganti ke screenshot
          asli begitu file di public/projects/ tersedia */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line-700 bg-gradient-to-br from-ink-800 to-ink-700">
        <div className="relative z-10 flex items-center gap-2 border-b border-line-700/80 bg-ink-900/60 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#e0635c]" />
          <span className="h-2 w-2 rounded-full bg-[#e3b157]" />
          <span className="h-2 w-2 rounded-full bg-[#5fb88f]" />
          <span className="ml-2 truncate rounded bg-ink-950/60 px-2.5 py-1 font-mono text-[11px] text-paper-400">
            {project.domainLabel}
          </span>
        </div>

        {previewLoaded ? (
          <div
            role="img"
            aria-label={`Screenshot ${project.title}`}
            className="absolute inset-0 top-[37px] bg-cover bg-top"
            style={{ backgroundImage: `url(${project.previewImage})` }}
          />
        ) : (
          <div className="relative flex h-[calc(100%-37px)] flex-col gap-2.5 p-5">
            <div className="h-2.5 w-1/3 rounded-full bg-paper-50/10" />
            <div className="mt-1 grid flex-1 grid-cols-3 gap-2.5">
              <div className="col-span-1 rounded-md bg-paper-50/[0.06]" />
              <div className="col-span-2 rounded-md bg-paper-50/[0.06]" />
            </div>
            <div className="h-2 w-2/3 rounded-full bg-paper-50/10" />
            <div className="h-2 w-1/2 rounded-full bg-paper-50/10" />

            <span className="pointer-events-none absolute bottom-3 right-4 font-display text-5xl font-semibold text-paper-50/[0.08]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Detail project */}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-ember-400">
          {project.category}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-paper-50">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-400">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line-700 px-2.5 py-1 font-mono text-[11px] text-paper-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-paper-100 transition-colors hover:text-ember-300"
        >
          Visit Website
          <ExternalLink
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  );
}
