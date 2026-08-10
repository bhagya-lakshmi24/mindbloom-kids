import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";

export function LegalPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="card-soft grid gap-6 p-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-1">
          {children}
        </div>
      </section>
    </>
  );
}