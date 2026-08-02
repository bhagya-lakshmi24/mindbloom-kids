import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const title = "Contact MindBloom ADHD Kids — Book a Free Consultation";
const description =
  "Book a free 20-minute consultation, message us on WhatsApp or email our team of ADHD specialists for children and parents.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  childAge: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Please tell us a little about your child").max(1000),
});

const WHATSAPP_NUMBER = "919000012345";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    toast.success("Thank you! We'll reply within one working day.");
    form.reset();
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your child"
        description="Tell us what a hard day looks like at home. We'll suggest a starting point — free, with no pressure to book anything."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} noValidate className="card-soft grid gap-4 p-8">
          <div className="grid gap-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" maxLength={100} placeholder="Priya Sharma" />
            {errors["name"] && <p className="text-sm text-destructive">{errors["name"]}</p>}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" maxLength={255} placeholder="you@email.com" />
              {errors["email"] && <p className="text-sm text-destructive">{errors["email"]}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="childAge">Child's age (optional)</Label>
              <Input id="childAge" name="childAge" maxLength={20} placeholder="8" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">How can we help?</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000} />
            {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
          </div>
          <Button type="submit" size="lg" className="rounded-full font-bold">
            Book my free consultation
          </Button>
        </form>

        <div className="grid gap-6">
          <div className="card-soft grid gap-4 p-8 text-sm">
            <a
              className="flex items-center gap-3 font-semibold"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi MindBloom, I'd like to book a free consultation.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex size-10 items-center justify-center rounded-2xl bg-grass-soft text-grass">
                <MessageCircle className="size-5" />
              </span>
              Chat on WhatsApp
            </a>
            <a className="flex items-center gap-3 font-semibold" href="mailto:hello@mindbloomadhd.com">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-sunny-soft text-primary">
                <Mail className="size-5" />
              </span>
              hello@mindbloomadhd.com
            </a>
            <p className="flex items-center gap-3 font-semibold">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-sky-soft text-sky">
                <MapPin className="size-5" />
              </span>
              Indiranagar, Bengaluru 560038
            </p>
          </div>
          <iframe
            title="MindBloom ADHD Kids location map"
            loading="lazy"
            className="h-72 w-full rounded-[var(--radius-2xl)] border border-border"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Indiranagar,Bengaluru&output=embed"
          />
        </div>
      </section>
    </>
  );
}