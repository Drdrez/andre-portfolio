"use client";

import { useState } from "react";

/* eslint-disable @next/next/no-img-element */

interface TechItem {
  name: string;
  iconSrc: string;
}

interface TechStackProps {
  frontend: TechItem[];
  backend: TechItem[];
  devtools: TechItem[];
}

const VISIBLE_COUNT = 4;

function Capsule({ name, iconSrc }: TechItem) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised/60 px-3 py-1.5 text-sm text-text-secondary shadow-1 transition-colors duration-fast hover:bg-surface-strong/40">
      <img
        src={iconSrc}
        alt=""
        width={18}
        height={18}
        className="h-[18px] w-[18px] shrink-0 object-contain"
        loading="lazy"
      />
      {name}
    </span>
  );
}

function StackGroup({ label, items }: { label: string; items: TechItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, VISIBLE_COUNT);
  const remaining = items.length - VISIBLE_COUNT;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {visible.map((item) => (
          <Capsule key={item.name} {...item} />
        ))}
        {!expanded && remaining > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text-secondary"
          >
            +{remaining} more
          </button>
        )}
        {expanded && items.length > VISIBLE_COUNT && (
          <button
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text-secondary"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}

export function TechStack({ frontend, backend, devtools }: TechStackProps) {
  return (
    <div className="mt-6 space-y-6">
      <StackGroup label="Frontend" items={frontend} />
      <StackGroup label="Backend" items={backend} />
      <StackGroup label="Developer tools" items={devtools} />
    </div>
  );
}
