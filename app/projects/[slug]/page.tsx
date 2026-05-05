import { projectItems } from "@/data/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PinterestGallery } from "@/components/PinterestGallery";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projectItems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projectItems.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Andre`,
    description: project.description,
  };
}

/* ── Design slugs that get the Pinterest grid ── */
const designSlugs = new Set([
  "social-media-designs",
  "poster-designs",
  "logo-identity",
  "merch-designs",
  "android-apps",
]);

/* ── Mobile app slug ── */
const mobileSlugs = new Set(["mobile-app-design"]);

/* ── Phone screens per mobile project ── */
const phoneScreens: Record<string, { name: string; subtitle: string; screens: { label: string; src: string }[] }[]> = {
  "mobile-app-design": [
    {
      name: "UNIVENTS",
      subtitle: "A conceptual prototype for the ADDU Events mobile application",
      screens: [
        { label: "Log In", src: "/projects/mobile-app-design/univents/log-in-page-compressify.io.jpg" },
        { label: "Dashboard", src: "/projects/mobile-app-design/univents/dashboard-compressify.io.jpg" },
        { label: "Event Details", src: "/projects/mobile-app-design/univents/it-week-details-compressify.io.jpg" },
      ],
    },
  ],
};

/* ── Website URLs per web project ── */
const websiteUrls: Record<string, { title: string; url: string }[]> = {
  "websites": [
    { title: "Safe Travel Cooperative", url: "https://safe-travel-cooperative.vercel.app/" },
    { title: "GN Travel Marketing", url: "https://gntravelmarketing.com/" },
    { title: "Travel Agent Content Pro", url: "https://community.travelagentcontentpro.com/travelagentcontentpro" },
  ],
};

/* ── Gallery items per design category ── */
/* Each item has a thumb (shown in grid) and slides (shown in lightbox carousel) */
type GalleryItem = { thumb: string; slides: string[] };

const galleryData: Record<string, GalleryItem[]> = {
  "android-apps": [
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_1.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_1.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_2.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_2.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_3.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_3.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_4.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_4.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_5.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_5.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_6.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_6.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_7.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_7.png"] },
    { thumb: "/projects/mobile-app-design/bountees-kitchen/image_8.png", slides: ["/projects/mobile-app-design/bountees-kitchen/image_8.png"] },
  ],
  "social-media-designs": [
    // Carousel sets — grid shows first image, click opens full carousel
    {
      thumb: "/projects/social-media-designs/carousel-1/1.jpg",
      slides: [
        "/projects/social-media-designs/carousel-1/1.jpg",
        "/projects/social-media-designs/carousel-1/2.jpg",
        "/projects/social-media-designs/carousel-1/3.jpg",
        "/projects/social-media-designs/carousel-1/4.jpg",
        "/projects/social-media-designs/carousel-1/5.jpg",
      ],
    },
    {
      thumb: "/projects/social-media-designs/carousel-2/1.jpg",
      slides: [
        "/projects/social-media-designs/carousel-2/1.jpg",
        "/projects/social-media-designs/carousel-2/2.jpg",
      ],
    },
    {
      thumb: "/projects/social-media-designs/carousel-3/1.png",
      slides: [
        "/projects/social-media-designs/carousel-3/1.png",
        "/projects/social-media-designs/carousel-3/2.png",
      ],
    },
    {
      thumb: "/projects/social-media-designs/carousel-5/1.jpg",
      slides: [
        "/projects/social-media-designs/carousel-5/1.jpg",
        "/projects/social-media-designs/carousel-5/2.jpg",
        "/projects/social-media-designs/carousel-5/3.jpg",
        "/projects/social-media-designs/carousel-5/4.jpg",
        "/projects/social-media-designs/carousel-5/5.jpg",
      ],
    },
    {
      thumb: "/projects/social-media-designs/carousel-6/1.jpg",
      slides: [
        "/projects/social-media-designs/carousel-6/1.jpg",
        "/projects/social-media-designs/carousel-6/2.jpg",
        "/projects/social-media-designs/carousel-6/3.jpg",
        "/projects/social-media-designs/carousel-6/4.jpg",
        "/projects/social-media-designs/carousel-6/5.jpg",
        "/projects/social-media-designs/carousel-6/6.jpg",
        "/projects/social-media-designs/carousel-6/7.jpg",
      ],
    },
    // Single images
    { thumb: "/projects/social-media-designs/cp-fb.jpg", slides: ["/projects/social-media-designs/cp-fb.jpg"] },
    { thumb: "/projects/social-media-designs/facebook-size.jpg", slides: ["/projects/social-media-designs/facebook-size.jpg"] },
    { thumb: "/projects/social-media-designs/fb-ig-size.jpg", slides: ["/projects/social-media-designs/fb-ig-size.jpg"] },
    { thumb: "/projects/social-media-designs/poster-4.jpg", slides: ["/projects/social-media-designs/poster-4.jpg"] },
    { thumb: "/projects/social-media-designs/poster-5.jpg", slides: ["/projects/social-media-designs/poster-5.jpg"] },
    { thumb: "/projects/social-media-designs/cancun.jpg", slides: ["/projects/social-media-designs/cancun.jpg"] },
    { thumb: "/projects/social-media-designs/dream clients.jpg", slides: ["/projects/social-media-designs/dream clients.jpg"] },
    { thumb: "/projects/social-media-designs/gn travel cover.jpg", slides: ["/projects/social-media-designs/gn travel cover.jpg"] },
    { thumb: "/projects/social-media-designs/hello september.jpg", slides: ["/projects/social-media-designs/hello september.jpg"] },
    { thumb: "/projects/social-media-designs/relaxation.jpg", slides: ["/projects/social-media-designs/relaxation.jpg"] },
    { thumb: "/projects/social-media-designs/tac pro cover.jpg", slides: ["/projects/social-media-designs/tac pro cover.jpg"] },
  ],
  "logo-identity": [
    { thumb: "/projects/logo-identity/1.jpg", slides: ["/projects/logo-identity/1.jpg"] },
    { thumb: "/projects/logo-identity/2.jpg", slides: ["/projects/logo-identity/2.jpg"] },
    { thumb: "/projects/logo-identity/3.jpg", slides: ["/projects/logo-identity/3.jpg"] },
    { thumb: "/projects/logo-identity/4.jpg", slides: ["/projects/logo-identity/4.jpg"] },
    { thumb: "/projects/logo-identity/5.jpg", slides: ["/projects/logo-identity/5.jpg"] },
    { thumb: "/projects/logo-identity/6.jpg", slides: ["/projects/logo-identity/6.jpg"] },
    { thumb: "/projects/logo-identity/7.jpg", slides: ["/projects/logo-identity/7.jpg"] },
    { thumb: "/projects/logo-identity/8.jpg", slides: ["/projects/logo-identity/8.jpg"] },
    { thumb: "/projects/logo-identity/9.png", slides: ["/projects/logo-identity/9.png"] },
  ],
  "merch-designs": [
    { thumb: "/projects/merch-designs/1.jpg", slides: ["/projects/merch-designs/1.jpg"] },
    { thumb: "/projects/merch-designs/2.jpg", slides: ["/projects/merch-designs/2.jpg"] },
    { thumb: "/projects/merch-designs/3.jpg", slides: ["/projects/merch-designs/3.jpg"] },
    { thumb: "/projects/merch-designs/4.jpg", slides: ["/projects/merch-designs/4.jpg"] },
    { thumb: "/projects/merch-designs/5.jpg", slides: ["/projects/merch-designs/5.jpg"] },
    { thumb: "/projects/merch-designs/6.jpg", slides: ["/projects/merch-designs/6.jpg"] },
    { thumb: "/projects/merch-designs/7.jpg", slides: ["/projects/merch-designs/7.jpg"] },
    { thumb: "/projects/merch-designs/8.jpg", slides: ["/projects/merch-designs/8.jpg"] },
    { thumb: "/projects/merch-designs/9.jpg", slides: ["/projects/merch-designs/9.jpg"] },
    { thumb: "/projects/merch-designs/10.jpg", slides: ["/projects/merch-designs/10.jpg"] },
    { thumb: "/projects/merch-designs/11.jpg", slides: ["/projects/merch-designs/11.jpg"] },
    { thumb: "/projects/merch-designs/12.jpg", slides: ["/projects/merch-designs/12.jpg"] },
  ],
  "poster-designs": [
    { thumb: "/projects/poster-designs/1.jpg", slides: ["/projects/poster-designs/1.jpg"] },
    { thumb: "/projects/poster-designs/asimco-newsletter.jpg", slides: ["/projects/poster-designs/asimco-newsletter.jpg"] },
    { thumb: "/projects/poster-designs/me.jpg", slides: ["/projects/poster-designs/me.jpg"] },
    { thumb: "/projects/poster-designs/poster-3.jpg", slides: ["/projects/poster-designs/poster-3.jpg"] },
  ],
};

/* ── Decorative mockup frame (for non-design projects) ── */
function MockupFrame({ color, title }: { color: string; title: string }) {
  return (
    <div className="relative w-full">
      <div className="rounded-t-xl border border-b-0 border-border bg-surface-raised px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 rounded-md bg-surface-strong/60 px-3 py-1 text-xs text-text-muted truncate">
            andre.dev/{title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          </span>
        </div>
      </div>
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-b-xl border border-border"
        style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}44 50%, ${color}22 100%)` }}
      >
        <div className="w-[85%] max-w-md space-y-4 p-8">
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 rounded-full" style={{ backgroundColor: `${color}66` }} />
            <div className="flex gap-2">
              <div className="h-3 w-12 rounded-full" style={{ backgroundColor: `${color}44` }} />
              <div className="h-3 w-12 rounded-full" style={{ backgroundColor: `${color}44` }} />
              <div className="h-3 w-12 rounded-full" style={{ backgroundColor: `${color}44` }} />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-6 w-3/4 rounded-lg" style={{ backgroundColor: `${color}55` }} />
            <div className="h-4 w-full rounded-md" style={{ backgroundColor: `${color}33` }} />
            <div className="h-4 w-5/6 rounded-md" style={{ backgroundColor: `${color}33` }} />
          </div>
          <div className="mt-4 flex gap-3">
            <div className="h-8 w-24 rounded-lg" style={{ backgroundColor: `${color}66` }} />
            <div className="h-8 w-24 rounded-lg border-2" style={{ borderColor: `${color}44` }} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-lg p-3" style={{ backgroundColor: `${color}22` }}>
                <div className="h-3 w-full rounded" style={{ backgroundColor: `${color}44` }} />
                <div className="h-2 w-3/4 rounded" style={{ backgroundColor: `${color}33` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: color }} />
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
/* ── Phone frame showcase for mobile apps ── */
function PhoneShowcase({ apps }: { apps: { name: string; subtitle: string; screens: { label: string; src: string }[] }[] }) {
  return (
    <div className="space-y-12">
      {apps.map((app, ai) => (
        <div key={ai}>
          <div className="mb-6">
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{app.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">{app.subtitle}</p>
          </div>
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
            <div className="flex gap-6 min-w-min">
              {app.screens.map((screen, i) => (
                <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative w-[220px] sm:w-[260px]">
                    <div className="rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-800 shadow-[0_0_0_2px_rgba(100,100,100,0.3),0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden">
                      <div className="relative bg-gray-800 flex justify-center py-2">
                        <div className="h-[22px] w-[90px] rounded-full bg-gray-900 flex items-center justify-end pr-3">
                          <div className="h-[10px] w-[10px] rounded-full bg-gray-800 ring-1 ring-gray-700" />
                        </div>
                      </div>
                      <div className="bg-white">
                        <img src={screen.src} alt={screen.label} className="block w-full h-auto" loading="lazy" />
                      </div>
                      <div className="bg-gray-800 flex justify-center py-2">
                        <div className="h-[4px] w-[100px] rounded-full bg-gray-600" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-text-muted">{screen.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Browser frame showcase for websites ── */
function WebsiteShowcase({ sites }: { sites: { title: string; url: string }[] }) {
  return (
    <div className="space-y-16">
      {sites.map((site, i) => (
        <div key={i} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">{site.title}</h2>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-text-primary px-5 py-2.5 text-sm font-medium text-surface transition-transform hover:scale-105 shadow-2"
            >
              Visit Live Site
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
          {/* Browser frame */}
          <div className="w-full rounded-xl border border-border bg-surface-raised shadow-3 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 border-b border-border bg-surface-strong/30 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 rounded-md bg-surface-strong/60 px-3 py-1 text-xs text-text-muted truncate max-w-sm">
                {site.url}
              </span>
            </div>
            {/* Iframe */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] bg-white relative">
              <iframe
                src={site.url}
                className="absolute inset-0 w-full h-full border-0"
                title={site.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectPage({ params }: PageProps) {
  const project = projectItems.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const idx = projectItems.findIndex((p) => p.slug === params.slug);
  const prev = idx > 0 ? projectItems[idx - 1] : null;
  const next = idx < projectItems.length - 1 ? projectItems[idx + 1] : null;

  const isDesign = designSlugs.has(project.slug);
  const isMobile = mobileSlugs.has(project.slug);
  const gallery = galleryData[project.slug];
  const screens = phoneScreens[project.slug];
  const sites = websiteUrls[project.slug];

  return (
    <div className="min-h-screen bg-surface">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md shadow-1">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to portfolio
          </Link>
          <div className="flex gap-2">
            {prev && (
              <Link href={`/projects/${prev.slug}`} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary" title={prev.title}>
                ← Prev
              </Link>
            )}
            {next && (
              <Link href={`/projects/${next.slug}`} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary" title={next.title}>
                Next →
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* Header info */}
        <div className="mb-10 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-surface-raised/60 px-3 py-1 text-xs font-medium text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {project.description}
          </p>
        </div>

        {/* Visual showcase */}
        {sites ? (
          <WebsiteShowcase sites={sites} />
        ) : isMobile && screens ? (
          <PhoneShowcase apps={screens} />
        ) : isDesign && gallery ? (
          <div className="space-y-8">
            {project.slug === "android-apps" && (
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-text-primary">Bountees' Kitchen</h2>
                <p className="mt-1 text-sm text-text-secondary">A point of sale app for canteen</p>
              </div>
            )}
            <PinterestGallery items={gallery} columns={project.slug === "android-apps" ? 2 : 3} />
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <MockupFrame color={project.mockupColor} title={project.title} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Highlights</h2>
                <ul className="space-y-3">
                  {[
                    "Pixel-perfect attention to detail across every deliverable",
                    "Client-ready exports with proper specifications",
                    "Iterative process with revision cycles built in",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: project.mockupColor }} />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-interactive px-5 py-3 text-sm font-semibold text-interactive-contrast shadow-2 transition-[filter] duration-fast hover:brightness-90"
          >
            Inquire about this project
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
