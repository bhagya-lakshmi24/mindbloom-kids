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
    price: "₹1,499",
    unit: "per session",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning Plans",
    text: "A written plan with goals, accommodations and weekly steps shared with you and, if you wish, your child's school.",
    price: "₹2,999",
    unit: "per plan",
  },
  {
    icon: UserRoundCheck,
    title: "One-on-One Coaching",
    text: "Weekly sessions on planning, emotional regulation and self-advocacy, paced to your child's attention span.",
    price: "₹999",
    unit: "per session",
  },
  {
    icon: MessagesSquare,
    title: "Parent Training Sessions",
    text: "Small-group and private training on routines, praise, boundaries and de-escalation that actually stick.",
    price: "₹799",
    unit: "per session",
  },
  {
    icon: Smile,
    title: "Social Skills Development",
    text: "Guided peer groups practising turn-taking, reading cues and repairing friendships after conflict.",
    price: "₹1,199",
    unit: "per month",
  },
  {
    icon: Puzzle,
    title: "Memory & Focus Games",
    text: "Short, structured play sessions that train working memory and sustained attention without feeling like drills.",
    price: "₹599",
    unit: "per month",
  },
  {
    icon: Handshake,
    title: "Homework Support",
    text: "Chunking, timers and body-doubling sessions so evenings stop ending in tears for everyone.",
    price: "₹499",
    unit: "per week",
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
            <article
              key={s.title}
              className="card-soft flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-soft text-sky">
                <s.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.text}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <p className="font-display text-2xl font-extrabold text-primary">
                  {s.price}
                  <span className="ml-1 text-xs font-semibold text-muted-foreground">{s.unit}</span>
                </p>
                <Button asChild size="sm" className="rounded-full font-bold">
                  <Link to="/contact">Book</Link>
                </Button>
              </div>
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