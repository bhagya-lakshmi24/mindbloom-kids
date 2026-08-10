import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthProvider";
import {
  AGE_GROUPS,
  AVATARS,
  PREFERENCES,
  createChild,
  deleteChild,
  getChildProgress,
  listChildren,
  type Child,
  type ChildProgress,
} from "@/lib/mindbloom";

const title = "Parent Dashboard — MindBloom ADHD Kids";
const description =
  "Create child profiles, review activity progress and mood check-ins, and manage consent — all under your parent account.";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ParentDashboard,
});

const childSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, "Add a nickname")
    .max(24, "Keep the nickname short (max 24 characters)"),
  ageGroup: z.string().min(1, "Choose an age group"),
});

function ParentDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [progress, setProgress] = useState<Record<string, ChildProgress>>({});
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState<string>(AGE_GROUPS[0]);
  const [avatar, setAvatar] = useState<string>(AVATARS[0]);
  const [prefs, setPrefs] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  const refresh = useCallback(async () => {
    setFetching(true);
    try {
      const kids = await listChildren();
      setChildren(kids);
      const entries = await Promise.all(
        kids.map(async (c) => [c.id, await getChildProgress(c.id)] as const),
      );
      setProgress(Object.fromEntries(entries));
    } catch {
      toast.error("Could not load your dashboard.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (user) void refresh();
  }, [user, refresh]);

  async function onAddChild(e: React.FormEvent) {
    e.preventDefault();
    if (!user || busy) return;
    const parsed = childSchema.safeParse({ nickname, ageGroup });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the details");
      return;
    }
    if (!consent) {
      toast.error("Please confirm parental consent to continue");
      return;
    }
    setBusy(true);
    try {
      await createChild({
        parentId: user.id,
        nickname: parsed.data.nickname,
        ageGroup: parsed.data.ageGroup,
        avatar,
        preferences: prefs,
      });
      toast.success(`${parsed.data.nickname}'s profile is ready`);
      setNickname("");
      setPrefs([]);
      setConsent(false);
      setShowForm(false);
      await refresh();
    } catch {
      toast.error("Could not create the profile. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(child: Child) {
    if (!window.confirm(`Delete ${child.nickname}'s profile and all linked activity data?`)) return;
    try {
      await deleteChild(child.id);
      toast.success("Profile deleted");
      await refresh();
    } catch {
      toast.error("Could not delete the profile.");
    }
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Parent Dashboard"
        title="Your family space"
        description="Add a child profile, follow their progress, and stay in control of what is stored."
      />
      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="card-soft mb-8 flex flex-wrap items-center gap-3 p-5 text-sm">
          <ShieldCheck className="size-5 text-grass" />
          <p className="text-muted-foreground">
            Only your account can see these profiles. Read how we protect them in{" "}
            <Link to="/child-safety" className="font-semibold underline">
              Child Safety
            </Link>
            .
          </p>
          <Button
            className="ml-auto rounded-full font-bold"
            onClick={() => setShowForm((v) => !v)}
            size="sm"
          >
            <Plus className="size-4" /> Add child profile
          </Button>
        </div>

        {showForm && (
          <form onSubmit={onAddChild} className="card-soft mb-8 grid gap-5 p-6">
            <div className="grid gap-2">
              <Label htmlFor="nickname">Child's nickname</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Sunny"
                maxLength={24}
              />
              <p className="text-xs text-muted-foreground">
                Please use a nickname, not your child's full legal name.
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Age group</Label>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUPS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setAgeGroup(g)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                      ageGroup === g
                        ? "border-transparent bg-sky text-white"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Avatar</Label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAvatar(a)}
                    aria-label={`Choose avatar ${a}`}
                    className={`size-11 rounded-full border text-xl transition-transform hover:-translate-y-0.5 ${
                      avatar === a ? "border-transparent bg-sunny-soft" : "border-border"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>What do they enjoy?</Label>
              <div className="flex flex-wrap gap-2">
                {PREFERENCES.map((p) => {
                  const on = prefs.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() =>
                        setPrefs((v) => (on ? v.filter((x) => x !== p) : [...v, p]))
                      }
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                        on
                          ? "border-transparent bg-grass-soft text-grass"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl bg-sky-soft/60 p-4 text-sm">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-4"
              />
              <span className="text-muted-foreground">
                I am this child's parent or guardian and I consent to MindBloom storing this profile
                and its activity data.{" "}
                <Link to="/parent-consent" className="font-semibold underline">
                  Read the consent notice
                </Link>
                .
              </span>
            </label>

            <Button type="submit" disabled={busy} className="justify-self-start rounded-full font-bold">
              {busy && <Loader2 className="size-4 animate-spin" />} Create profile
            </Button>
          </form>
        )}

        {fetching ? (
          <div className="flex justify-center py-10">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : children.length === 0 ? (
          <div className="card-soft p-10 text-center">
            <p className="text-lg font-bold">No child profiles yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first profile to unlock the kid-friendly dashboard and progress tracking.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {children.map((c) => {
              const p = progress[c.id];
              return (
                <article key={c.id} className="card-soft grid gap-4 p-6">
                  <header className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full bg-sky-soft text-2xl">
                      {c.avatar}
                    </span>
                    <div>
                      <h2 className="font-display text-lg font-bold">{c.nickname}</h2>
                      <p className="text-xs text-muted-foreground">{c.age_group}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void onDelete(c)}
                      aria-label={`Delete ${c.nickname}'s profile`}
                      className="ml-auto rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </header>

                  <dl className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-2xl bg-grass-soft/70 p-3">
                      <dt className="text-xs text-muted-foreground">Activities</dt>
                      <dd className="text-xl font-extrabold">{p?.activities ?? 0}</dd>
                    </div>
                    <div className="rounded-2xl bg-sunny-soft/70 p-3">
                      <dt className="text-xs text-muted-foreground">Minutes</dt>
                      <dd className="text-xl font-extrabold">{p?.minutes ?? 0}</dd>
                    </div>
                    <div className="rounded-2xl bg-sky-soft/70 p-3">
                      <dt className="text-xs text-muted-foreground">Routine today</dt>
                      <dd className="text-xl font-extrabold">
                        {p ? `${p.routineDoneToday}/${p.routineTotal}` : "0/0"}
                      </dd>
                    </div>
                  </dl>

                  {p && p.moods.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">
                        Recent moods
                      </p>
                      <p className="mt-1 text-sm">
                        {p.moods.map((m) => m.mood).join(" · ")}
                      </p>
                    </div>
                  )}

                  {p && p.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.badges.map((b) => (
                        <span
                          key={b.badge_key}
                          className="rounded-full bg-sunny-soft px-3 py-1 text-xs font-bold"
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button asChild variant="secondary" size="sm" className="rounded-full font-bold">
                    <Link to="/kids" search={{ child: c.id }}>
                      Open kids mode
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-10 rounded-2xl bg-muted/50 p-4 text-center text-xs text-muted-foreground">
          MindBloom is an educational well-being tool. It does not diagnose, treat or cure ADHD.
          Please speak with a qualified professional for medical advice.
        </p>
      </section>
    </>
  );
}