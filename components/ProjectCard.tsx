export function ProjectCard({
  title,
  description,
  url,
  urlLabel,
  kind,
}: {
  title: string;
  description: string;
  url?: string;
  urlLabel?: string;
  kind?: string;
}) {
  const derivedLabel = (() => {
    if (urlLabel) return urlLabel;
    if (!url) return undefined;
    try {
      const href = url.startsWith("http") ? url : `https://${url}`;
      return new URL(href).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  })();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-1 transition-shadow duration-normal hover:shadow-2">
      {kind ? (
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {kind}
        </p>
      ) : null}
      <h3 className={`text-base font-semibold text-text-primary ${kind ? "mt-1" : ""}`}>
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      {url && derivedLabel ? (
        <p className="mt-4">
          <a
            href={url.startsWith("http") ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-text-tertiary underline-offset-2 transition-colors duration-fast hover:bg-surface-strong hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          >
            <span className="truncate">{derivedLabel}</span>
          </a>
        </p>
      ) : null}
    </article>
  );
}
