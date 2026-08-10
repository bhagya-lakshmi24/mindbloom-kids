import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { lovable } from "@/integrations/lovable/index";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Sign in — MindBloom ADHD Kids Parent Account";
const description =
  "Sign in or create a free MindBloom parent account to save activities, track progress and manage your bookings.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  fullName: z.string().trim().max(80).optional(),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/parent", replace: true });
  }, [loading, user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    if (mode === "forgot") {
      const parsedEmail = z.string().trim().email().safeParse(email);
      if (!parsedEmail.success) {
        toast.error("Enter a valid email");
        return;
      }
      setBusy(true);
      const { error } = await supabase.auth.resetPasswordForEmail(parsedEmail.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      if (error) toast.error(error.message);
      else toast.success("Password reset link sent — check your inbox.");
      return;
    }

    const parsed = schema.safeParse({ email, password, fullName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: parsed.data.fullName || null },
          },
        });
        if (error) throw error;
        toast.success("Account created successfully!");
        if (data.session) {
          navigate({ to: "/parent", replace: true });
        } else {
          toast.info("Check your email to confirm your address, then sign in.");
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/parent", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    if (busy) return;
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/parent", replace: true });
  }

  return (
    <>
      <PageHero
        eyebrow="Parent Account"
        title={
          mode === "signin"
            ? "Welcome back"
            : mode === "signup"
              ? "Create your parent account"
              : "Reset your password"
        }
        description="MindBloom accounts belong to a parent or guardian. You stay in control of your child's profile and data."
      />
      <section className="mx-auto max-w-md px-5 py-16">
        <form onSubmit={onSubmit} className="card-soft grid gap-4 p-8">
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="fullName">Your name (parent / guardian)</Label>
              <Input
                id="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Priya S."
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          {mode !== "forgot" && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          )}
          <Button type="submit" size="lg" disabled={busy} className="rounded-full font-bold">
            {busy && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
          </Button>
          {mode !== "forgot" && (
            <>
              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground uppercase">
                <span className="h-px flex-1 bg-border" /> or{" "}
                <span className="h-px flex-1 bg-border" />
              </div>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                disabled={busy}
                onClick={onGoogle}
                className="rounded-full font-bold"
              >
                Continue with Google
              </Button>
            </>
          )}
          <div className="grid gap-1 text-center">
            <button
              type="button"
              className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            >
              {mode === "signup"
                ? "Already have an account? Sign in"
                : "New here? Create a free account"}
            </button>
            <button
              type="button"
              className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setMode(mode === "forgot" ? "signin" : "forgot")}
            >
              {mode === "forgot" ? "Back to sign in" : "Forgot your password?"}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </section>
    </>
  );
}