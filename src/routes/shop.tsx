import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";

const title = "Shop — ADHD Flashcards, Worksheets, Planners & Kits";
const description =
  "ADHD flashcards, printable worksheets, reward charts, planners, sensory activity kits and digital courses for families and educators.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Shop,
});

const products = [
  { name: "ADHD Flashcards", price: "₹699", note: "60 cards for focus, feelings and routines." },
  { name: "Printable Worksheets", price: "₹299", note: "Instant download, 40 pages." },
  { name: "Reward Charts", price: "₹399", note: "Reusable, wipe-clean, sticker pack included." },
  { name: "Daily Planners", price: "₹549", note: "Visual weekly layout built for short attention." },
  { name: "Sensory Activity Kit", price: "₹1,499", note: "Fidgets, textures and a guided card set." },
  { name: "Digital Course: Calm Homework", price: "₹1,999", note: "6 modules for parents, lifetime access." },
];

function Shop() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Tools your family can hold in their hands"
        description="Designed by our educators and therapists, tested with real families. Checkout opens soon — join the waitlist for launch pricing."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="card-soft flex flex-col p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-grass-soft text-grass">
                <ShoppingBag className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{p.name}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.note}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-xl font-extrabold">{p.price}</span>
                <Button
                  size="sm"
                  className="rounded-full font-bold"
                  onClick={() => toast.success(`We'll email you when ${p.name} ships.`)}
                >
                  Notify me
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}