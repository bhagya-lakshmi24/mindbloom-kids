export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="hero-surface border-b border-border">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}