import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, LogOut, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";

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
  const { user } = useSession();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/", replace: true });
  }

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

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          {user ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={signOut}
              className="rounded-full font-bold"
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          ) : (
            <Button asChild size="sm" variant="secondary" className="rounded-full font-bold">
              <Link to="/auth">
                <LogIn className="size-4" /> Login
              </Link>
            </Button>
          )}
          <Button asChild size="sm" className="hidden rounded-full font-bold sm:inline-flex">
            <Link to="/contact">Book Free Consultation</Link>
          </Button>
        </div>

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