import { createFileRoute } from "@tanstack/react-router";
import { Compass, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const title = "About MindBloom ADHD Kids — Our Mission & Experts";
const description =
  "Meet the psychologists, special educators and occupational therapists behind MindBloom, and read the mission guiding our ADHD support for children.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: About,
});

const experts = [
  {
    name: "Dr. Neha Verma",
    role: "Child Psychologist",
    bio: "12 years supporting neurodivergent children and coaching families through assessment and beyond.",
  },
  {
    name: "Arjun Rao",
    role: "Special Educator",
    bio: "Builds individualised learning plans that fit real classrooms, real homework and real attention spans.",
  },
  {
    name: "Sana Iqbal",
    role: "Occupational Therapist",
    bio: "Designs sensory routines and regulation strategies children can actually use on a busy morning.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A team that starts with your child's strengths"
        description="We don't promise cures. We offer structured, evidence-informed support that helps children with ADHD grow in confidence — and helps parents feel less alone."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-16 md:grid-cols-2">
        <article className="card-soft p-8">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-grass-soft text-grass">
            <Target className="size-5" />
          </span>
          <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground">
            To make high-quality ADHD support practical and affordable for every family — through
            playful learning activities, coaching, and guidance parents can apply the same day.
          </p>
        </article>
        <article className="card-soft p-8">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-soft text-sky">
            <Compass className="size-5" />
          </span>
          <h2 className="mt-4 text-2xl font-bold">Our Vision</h2>
          <p className="mt-3 text-muted-foreground">
            A world where children with ADHD are understood at home and at school, and where
            differences in learning are met with tools instead of labels.
          </p>
        </article>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="text-3xl font-extrabold">Meet Our Experts</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {experts.map((e) => (
            <article key={e.name} className="card-soft p-6">
              <span className="flex size-14 items-center justify-center rounded-full bg-sunny-soft text-xl font-extrabold text-primary">
                {e.name.split(" ").slice(-1)[0]?.[0]}
              </span>
              <h3 className="mt-4 text-lg font-bold">{e.name}</h3>
              <p className="text-sm font-semibold text-primary">{e.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}