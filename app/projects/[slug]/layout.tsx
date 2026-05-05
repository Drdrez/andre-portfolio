import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Andre",
    default: "Projects — Andre",
  },
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
