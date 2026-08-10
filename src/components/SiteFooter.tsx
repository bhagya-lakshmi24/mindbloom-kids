import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-sky-soft/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">MindBloom ADHD Kids</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Helping every child learn, grow &amp; shine — with evidence-informed support for
            families, never quick-fix promises.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-bold">Explore</h4>
          <ul className="mt-2 grid gap-1 text-muted-foreground">
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/activities">Interactive Activities</Link>
            </li>
            <li>
              <Link to="/parent-corner">Parent Corner</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
          <h4 className="mt-4 font-bold">Safety &amp; Legal</h4>
          <ul className="mt-2 grid gap-1 text-muted-foreground">
            <li>
              <Link to="/child-safety">Child Safety &amp; Trust</Link>
            </li>
            <li>
              <Link to="/parent-consent">Parent Consent</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-bold">Reach us</h4>
          <ul className="mt-2 grid gap-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4" /> hello@mindbloomadhd.com
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4" /> WhatsApp: +91 90000 12345
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" /> Bengaluru, India
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-border/70 px-5 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MindBloom ADHD Kids. Educational support only — not a
        substitute for medical diagnosis or treatment.
      </p>
    </footer>
  );
}