import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

const title = "My Bookings — MindBloom ADHD Kids";
const description = "See your MindBloom consultations, coaching sessions and upcoming bookings.";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BookingsPage,
});

function BookingsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  return (
    <>
      <PageHero
        eyebrow="Parent Account"
        title="My Bookings"
        description="All your sessions with the MindBloom team in one place."
      />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="card-soft grid gap-4 p-8 text-center">
          <p className="font-semibold">You don't have any bookings yet.</p>
          <p className="text-sm text-muted-foreground">
            Book a free consultation and it will show up here.
          </p>
          <div>
            <Button asChild className="rounded-full font-bold">
              <Link to="/services">Browse services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}