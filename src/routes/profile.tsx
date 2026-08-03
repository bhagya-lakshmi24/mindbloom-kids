import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHero } from "@/components/PageHero";
import { useAuth } from "@/components/AuthProvider";

const title = "My Profile — MindBloom ADHD Kids";
const description = "View your MindBloom parent account details and manage your child's journey.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  return (
    <>
      <PageHero
        eyebrow="Parent Account"
        title="My Profile"
        description="Your account details with MindBloom."
      />
      <section className="mx-auto max-w-2xl px-5 py-16">
        <div className="card-soft grid gap-4 p-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Email
            </p>
            <p className="font-semibold">{user?.email ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Member since
            </p>
            <p className="font-semibold">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}