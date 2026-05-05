import { profile } from "@/data/content";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-border bg-surface-raised"
    >
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <p className="text-center text-xs text-text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
