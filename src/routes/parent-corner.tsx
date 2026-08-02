import { createFileRoute } from "@tanstack/react-router";
import { Apple, Download, FileText, Lightbulb, Moon } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const title = "Parent Corner — ADHD Tips, Diet, Sleep & Free Worksheets";
const description =
  "Practical ADHD tips, diet suggestions, a sleep routine guide, free downloadable worksheets and blog articles for parents of children with ADHD.";

export const Route = createFileRoute("/parent-corner")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ParentCorner,
});

const guides = [
  {
    icon: Lightbulb,
    title: "ADHD Tips",
    points: [
      "Give one instruction at a time, then ask for it back in their words.",
      "Praise the effort you want repeated, within ten seconds of seeing it.",
      "Use visible timers — time is abstract until a child can watch it move.",
    ],
  },
  {
    icon: Apple,
    title: "Diet Suggestions",
    points: [
      "Protein at breakfast steadies the morning far more than cereal alone.",
      "Keep hydration visible: a marked bottle on the study desk.",
      "Discuss supplements with your paediatrician before changing anything.",
    ],
  },
  {
    icon: Moon,
    title: "Sleep Routine Guide",
    points: [
      "Same wind-down order every night; the sequence matters more than the clock.",
      "Screens off 60 minutes before bed, replaced by a predictable quiet activity.",
      "A short 'worry dump' on paper stops bedtime rumination.",
    ],
  },
];

const worksheets = [
  "Morning routine picture chart",
  "Homework chunking planner",
  "Feelings thermometer",
  "Weekly reward chart",
];

const articles = [
  {
    title: "Why rewards stop working (and how to refresh them)",
    excerpt: "Novelty is fuel for an ADHD brain. Rotate rewards before they go stale.",
  },
  {
    title: "Talking to your child's school without conflict",
    excerpt: "A simple one-page summary that teachers actually read and act on.",
  },
  {
    title: "Mornings that don't end in shouting",
    excerpt: "Move three decisions to the night before and watch the pressure drop.",
  },
];

function ParentCorner() {
  return (
    <>
      <PageHero
        eyebrow="Parent corner"
        title="You know your child best — we'll add the tools"
        description="Short, practical guidance you can read in a coffee break and try the same evening."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {guides.map((g) => (
            <article key={g.title} className="card-soft p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-sunny-soft text-primary">
                <g.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{g.title}</h2>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {g.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="card-soft mt-8 p-8">
          <h2 className="text-2xl font-bold">Free Downloadable Worksheets</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Printable and ready to stick on the fridge. Ask us for the full pack at your free
            consultation.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {worksheets.map((w) => (
              <li
                key={w}
                className="flex items-center gap-3 rounded-xl border border-border bg-sky-soft/50 px-4 py-3 text-sm font-semibold"
              >
                <Download className="size-4 text-sky" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="mt-16 text-3xl font-extrabold">Blog Articles</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.title} className="card-soft p-6">
              <FileText className="size-5 text-grass" />
              <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}