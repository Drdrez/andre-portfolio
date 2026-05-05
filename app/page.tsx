import Image from "next/image";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { SiteFooter } from "@/components/SiteFooter";
import { ChatWidget } from "@/components/ChatWidget";
import { TechStack } from "@/components/TechStack";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import {
  aboutParagraphs,
  backend,
  certifications,
  devtools,
  experience,
  frontend,
  profile,
  projectItems,
  tools,
} from "@/data/content";

function InitialsAvatar() {
  const parts = profile.name.split(/\s+/).filter(Boolean);
  const letters =
    parts.length >= 2
      ? `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase()
      : (parts[0]?.slice(0, 2).toUpperCase() ?? "?");
  return (
    <div
      className="flex aspect-square w-full max-w-[11rem] items-center justify-center rounded-lg border border-dashed border-border bg-surface-raised text-2xl font-semibold tracking-tight text-text-muted"
      aria-hidden
    >
      {letters}
    </div>
  );
}



export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="absolute left-4 top-4 z-[100] -translate-y-20 rounded-token bg-text-primary px-4 py-2 text-sm font-medium text-interactive-contrast opacity-0 shadow-4 transition-all duration-fast focus:translate-y-0 focus:opacity-100 focus:outline-2 focus:outline-offset-2 focus:outline-text-primary"
      >
        Skip to content
      </a>
      <main id="main" className="min-h-screen">
        {/* Hero */}
        <div
          id="top"
          className="border-b border-border bg-surface bg-[linear-gradient(180deg,var(--color-surface-raised)_0%,transparent_50%)]"
        >
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              {profile.imageSrc ? (
                <div className="relative aspect-square w-full max-w-[8.5rem] shrink-0 overflow-hidden rounded-lg border border-border shadow-2">
                  <Image
                    src={profile.imageSrc}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority
                  />
                </div>
              ) : (
                <InitialsAvatar />
              )}
              <div className="relative min-w-0 flex-1">
                <div className="absolute right-0 top-0 z-10">
                  <ThemeToggle />
                </div>
                <h1 className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-10 text-pretty text-xl font-bold tracking-tight text-text-primary sm:pr-12 sm:text-2xl">
                  <span>{profile.name}</span>
                  {profile.verified ? (
                    <VerifiedBadge
                      className="translate-y-px"
                      label="Verified"
                    />
                  ) : null}
                </h1>
                <p className="mt-1 flex items-start gap-1.5 text-xs text-text-secondary">
                  <span className="mt-0.5 text-text-muted" aria-hidden>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 shrink-0"
                    >
                      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <span>{profile.location}</span>
                </p>
                <p className="mt-1 max-w-xl text-xs font-medium text-text-tertiary">
                  {profile.tagline}
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a
                    href={profile.scheduleUrl}
                    {...(/^https?:\/\//i.test(profile.scheduleUrl)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-interactive px-3 py-2 text-xs font-semibold text-interactive-contrast shadow-2 transition-[filter] duration-fast hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 shrink-0 opacity-90"
                      aria-hidden
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    Schedule a Call
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 shrink-0 opacity-90"
                      aria-hidden
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary shadow-1 transition-colors duration-fast hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-w-[10rem]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 shrink-0 text-text-secondary"
                      aria-hidden
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-14 xl:gap-16">
            {/* Main column */}
            <div className="min-w-0 space-y-16">
              <section
                id="about"
                className="scroll-mt-24"
                aria-labelledby="about-heading"
              >
                <h2
                  id="about-heading"
                  className="text-xl font-semibold text-text-primary"
                >
                  About
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              <section id="tools" className="scroll-mt-24" aria-labelledby="tools-h">
                <h2
                  id="tools-h"
                  className="text-xl font-semibold text-text-primary"
                >
                  Tools
                </h2>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  role="list"
                >
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-raised/60 px-3 py-2 shadow-1">
                        <Image
                          src={tool.iconSrc}
                          alt=""
                          width={26}
                          height={26}
                          className="size-[26px] shrink-0 object-contain"
                          loading="lazy"
                          unoptimized
                        />
                        <span className="text-sm text-text-secondary">
                          {tool.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="stack" className="scroll-mt-24" aria-labelledby="stack-h">
                <h2
                  id="stack-h"
                  className="text-xl font-semibold text-text-primary"
                >
                  Tech stack
                </h2>
                <TechStack frontend={frontend} backend={backend} devtools={devtools} />
              </section>

              <section
                id="projects"
                className="scroll-mt-24"
                aria-labelledby="projects-h"
              >
                <h2
                  id="projects-h"
                  className="text-xl font-semibold text-text-primary"
                >
                  Projects
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {projectItems.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-1 transition-all duration-normal hover:shadow-2 hover:border-border-strong hover:-translate-y-0.5"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {p.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium uppercase tracking-wide text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-base font-semibold text-text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-2">
                        {p.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors group-hover:text-text-primary">
                        View project
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {certifications.length > 0 ? (
                <section
                  id="certifications"
                  className="scroll-mt-24"
                  aria-labelledby="cert-h"
                >
                  <h2
                    id="cert-h"
                    className="text-xl font-semibold text-text-primary"
                  >
                    Certifications
                  </h2>
                  <ul className="mt-6 space-y-4" role="list">
                    {certifications.map((c) => (
                      <li key={c.title}>
                        <p className="text-sm font-semibold text-text-primary">
                          {c.title}
                        </p>
                        <p className="mt-0.5 text-sm text-text-muted">
                          {c.issuer}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            {/* Sidebar — sticky, compact experience (vertical timeline line) */}
            <aside className="mt-16 min-w-0 border-t border-border pt-12 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="space-y-8 lg:sticky lg:top-24 lg:space-y-10">
                <div className="rounded-2xl bg-text-primary px-5 py-6 text-interactive-contrast shadow-3">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    Working style
                  </p>
                  <p className="mt-3 text-sm leading-relaxed opacity-90">
                    I do graphic design and also develop apps and websites.
                    Clean visuals, functional code, delivered on time.
                  </p>
                </div>

                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    Experience
                  </h2>
                  <ul className="mt-5 relative" role="list">
                    {/* Vertical timeline line */}
                    <div
                      className="absolute left-[3px] top-2 bottom-2 w-px bg-border"
                      aria-hidden
                    />
                    {experience.map((item, i) => (
                      <li
                        key={`${item.year}-${item.org}-${i}`}
                        className="relative flex gap-4 pb-6 last:pb-0"
                      >
                        <span
                          className="relative z-10 mt-1.5 h-[7px] w-[7px] shrink-0 rounded-full border-2 border-text-primary bg-surface"
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-text-primary">
                                {item.title}
                              </p>
                              <p className="mt-0.5 text-xs text-text-muted">
                                {item.org}
                              </p>
                            </div>
                            <p className="shrink-0 text-xs font-medium tabular-nums text-text-tertiary">
                              {item.year}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <ChatWidget />
      <SiteFooter />
    </>
  );
}
