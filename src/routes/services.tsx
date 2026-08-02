import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ClipboardCheck,
  GraduationCap,
  Handshake,
  MessagesSquare,
  Puzzle,
  Smile,
  UserRoundCheck,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";

const title = "Services — ADHD Coaching, Learning Plans & Parent Training";
const description =
  "Assessment guidance, personalized learning plans, one-on-one coaching, parent training, social skills, focus games and homework support for children with ADHD.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: ClipboardCheck,
    title: "ADHD Assessment Guidance",
    text: "We help you understand the assessment pathway, prepare questions and interpret reports — always alongside your clinician.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning Plans",
    text: "A written plan with goals, accommodations and weekly steps shared with you and, if you wish, your child's school.",
  },
  {
    icon: UserRoundCheck,
    title: "One-on-One Coaching",
    text: "Weekly sessions on planning, emotional regulation and self-advocacy, paced to your child's attention span.",
  },
  {
    icon: MessagesSquare,
    title: "Parent Training Sessions",
    text: "Small-group and private training on routines, praise, boundaries and de-escalation that actually stick.",
  },
  {
    icon: Smile,
    title: "Social Skills Development",
    text: "Guided peer groups practising turn-taking, reading cues and repairing friendships after conflict.",
  },
  {
    icon: Puzzle,
    title: "Memory & Focus Games",
    text: "Short, structured play sessions that train working memory and sustained attention without feeling like drills.",
  },
  {
    icon: Handshake,
    title: "Homework Support",
    text: "Chunking, timers and body-doubling sessions so evenings stop ending in tears for everyone.",
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support for the child, and for the whole family"
        description="Mix and match what your family needs. Every plan starts with a free consultation and a clear, honest recommendation."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="card-soft p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-soft text-sky">
                <s.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild size="lg" className="rounded-full font-bold">
            <Link to="/contact">Book a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}