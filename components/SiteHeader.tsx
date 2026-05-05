import Link from "next/link";
import { profile } from "@/data/content";

const nav = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md shadow-1">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="#top"
          className="text-sm font-semibold tracking-tight text-text-primary transition-colors duration-fast hover:text-text-tertiary focus-visible:rounded-token focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {profile.navName}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition-colors duration-fast hover:text-text-primary focus-visible:rounded-token focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
