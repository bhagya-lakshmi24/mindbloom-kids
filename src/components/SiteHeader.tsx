import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/activities", label: "Activities" },
  { to: "/parent-corner", label: "Parent Corner" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-full bg-grass-soft text-grass">
            <Sparkles className="size-5" />
          </span>
          <span className="font-display text-lg leading-none font-bold">
            MindBloom
            <span className="block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              ADHD Kids
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-sky-soft hover:text-foreground"
              activeProps={{ className: "bg-sky-soft text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm" className="ml-auto rounded-full font-bold lg:ml-2">
          <Link to="/contact">Book Free Consultation</Link>
        </Button>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border px-5 py-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-sky-soft hover:text-foreground"
              activeProps={{ className: "bg-sky-soft text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}