import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, BookOpen, Gamepad2, Users, Star, HeartHandshake, Timer, Trophy } from "lucide-react";
import heroKids from "@/assets/hero-kids.jpg";
import { Button } from "@/components/ui/button";

const title = "MindBloom ADHD Kids — Learn, Grow & Shine";
const description =
  "Engaging learning activities, parent guidance and personalized support helping children with ADHD build confidence, focus and life skills.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const highlights = [
  { icon: HeartHandshake, label: "Personalized Learning" },
  { icon: Users, label: "Parent Support" },
  { icon: Gamepad2, label: "Interactive Games" },
  { icon: Trophy, label: "Progress Tracking" },
];

const services = [
  { icon: Brain, title: "ADHD Coaching", text: "One-on-one sessions that build focus, routine and self-belief." },
  { icon: BookOpen, title: "Homework Help", text: "Small steps, timers and checklists that make study time calmer." },
  { icon: Gamepad2, title: "Brain Games", text: "Attention, memory and puzzle play designed by specialists." },
  { icon: Users, title: "Parent Guidance", text: "Practical training so support continues at home every day." },
];

const testimonials = [
  {
    quote:
      "Aarav used to melt down over homework. Six weeks in, he sets his own timer and finishes maths before dinner.",
    name: "Priya S., parent of a 9-year-old",
  },
  {
    quote:
      "The parent training changed how we talk at home. Fewer arguments, far more wins worth celebrating.",
    name: "Rahul & Meera, Pune",
  },
  {
    quote:
      "The focus games feel like play to my daughter, but her teacher noticed the difference in class first.",
    name: "Fatima K., Hyderabad",
  },
];

function Index() {
  return (
    <>
      <section className="hero-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-grass-soft px-4 py-1.5 text-xs font-bold tracking-wide text-accent-foreground uppercase">
              <Star className="size-3.5" /> Evidence-informed, family-first
            </span>
            <h1 className="mt-5 text-4xl leading-tight font-extrabold sm:text-6xl">
              Helping Every Child Learn, Grow &amp; Shine
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Every child learns differently. At MindBloom ADHD Kids we provide engaging learning
              activities, parent guidance and personalized support to help children with ADHD build
              confidence, focus and life skills.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full font-bold">
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full font-bold">
                <Link to="/activities">Start Activities</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full font-bold">
                <Link to="/parent-corner">Parent Resources</Link>
              </Button>
            </div>
          </div>
          <img
            src={heroKids}
            width={1600}
            height={1104}
            alt="Illustration of children reading, building blocks and solving puzzles together"
            className="rounded-[2rem] bg-card"
          />
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-6xl px-5">
        <ul className="card-soft grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <li key={h.label} className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-sunny-soft text-primary">
                <h.icon className="size-5" />
              </span>
              <span className="font-bold">{h.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <h2 className="text-3xl font-extrabold">Our Services</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Support built around your child's strengths, delivered by psychologists, special educators
          and occupational therapists.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="card-soft p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-soft text-sky">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="secondary" className="rounded-full font-bold">
            <Link to="/services">See all services</Link>
          </Button>
        </div>
      </section>

      <section className="mt-20 border-y border-border bg-grass-soft/50 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold">Success Stories</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-soft p-6">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs font-bold text-muted-foreground">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="card-soft flex flex-col items-center gap-5 p-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-sunny-soft text-primary">
            <Timer className="size-6" />
          </span>
          <h2 className="text-3xl font-extrabold">Ready for a calmer week at home?</h2>
          <p className="max-w-xl text-muted-foreground">
            Start with a free 20-minute consultation. We'll listen, share two strategies you can try
            tonight, and suggest a plan only if it truly fits your family.
          </p>
          <Button asChild size="lg" className="rounded-full font-bold">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
