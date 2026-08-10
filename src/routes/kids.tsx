import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import {
  MOODS,
  listChildren,
  listRoutine,
  saveMood,
  toggleRoutineTask,
  type Child,
  type RoutineTask,
} from "@/lib/mindbloom";

const title = "Kids Mode — MindBloom ADHD Kids";
const description =
  "A simple, colourful space where your child can check in on their mood and tick off their daily routine.";

export const Route = createFileRoute("/kids")({
  validateSearch: z.object({ child: z.string().optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: KidsDashboard,
});

function KidsDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [children, setChildren] = useState<Child[]>([]);
  const [activeId, setActiveId] = useState<string | null>(search.child ?? null);
  const [tasks, setTasks] = useState<RoutineTask[]>([]);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      try {
        const kids = await listChildren();
        setChildren(kids);
        setActiveId((cur) => cur ?? kids[0]?.id ?? null);
      } catch {
        toast.error("Could not load profiles.");
      } finally {
        setFetching(false);
      }
    })();
  }, [user]);

  const loadRoutine = useCallback(async (childId: string) => {
    const { tasks: t, doneIds: d } = await listRoutine(childId);
    setTasks(t);
    setDoneIds(d);
  }, []);

  useEffect(() => {
    if (activeId) void loadRoutine(activeId);
  }, [activeId, loadRoutine]);

  const active = children.find((c) => c.id === activeId) ?? null;

  async function onMood(mood: string, emoji: string) {
    if (!active) return;
    try {
      await saveMood(active.id, mood);
      toast.success(`Thanks for sharing ${emoji}`);
    } catch {
      toast.error("Could not save the check-in.");
    }
  }

  async function onToggle(task: RoutineTask) {
    if (!active) return;
    const done = doneIds.has(task.id);
    try {
      await toggleRoutineTask(active.id, task.id, done);
      await loadRoutine(active.id);
      if (!done) toast.success("Nice work! 🎉");
    } catch {
      toast.error("Could not update the routine.");
    }
  }

  if (loading || !user || fetching) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Kids Mode"
        title={active ? `Hi ${active.nickname}! ${active.avatar}` : "Kids Mode"}
        description="Pick how you feel today and tick off your routine. Small steps count!"
      />
      <section className="mx-auto max-w-3xl px-5 py-14">
        {children.length === 0 ? (
          <div className="card-soft p-10 text-center">
            <p className="text-lg font-bold">No child profile yet</p>
            <Button asChild className="mt-4 rounded-full font-bold">
              <Link to="/parent">Go to Parent Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8">
            {children.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {children.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`rounded-full border px-4 py-2 font-bold transition-transform hover:-translate-y-0.5 ${
                      c.id === activeId
                        ? "border-transparent bg-sky text-white"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {c.avatar} {c.nickname}
                  </button>
                ))}
              </div>
            )}

            <div className="card-soft p-6">
              <h2 className="font-display text-xl font-bold">How do you feel today?</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {MOODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => void onMood(m.key, m.emoji)}
                    className="grid gap-1 rounded-2xl bg-sunny-soft/70 p-3 text-center transition-transform hover:-translate-y-1"
                  >
                    <span className="text-3xl">{m.emoji}</span>
                    <span className="text-xs font-bold">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-soft p-6">
              <h2 className="font-display text-xl font-bold">My routine today</h2>
              <ul className="mt-4 grid gap-2">
                {tasks.map((t) => {
                  const done = doneIds.has(t.id);
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => void onToggle(t)}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left font-bold transition-transform hover:-translate-y-0.5 ${
                          done
                            ? "border-transparent bg-grass-soft text-grass line-through"
                            : "border-border bg-background"
                        }`}
                      >
                        <span className="text-2xl">{t.emoji}</span>
                        {t.title}
                        <span className="ml-auto text-sm">{done ? "✅" : "⬜"}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="card-soft p-6 text-center">
              <h2 className="font-display text-xl font-bold">Want to play?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Focus timer, breathing and mind games are waiting for you.
              </p>
              <Button asChild className="mt-4 rounded-full font-bold">
                <Link to="/activities">Go to Activities</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}