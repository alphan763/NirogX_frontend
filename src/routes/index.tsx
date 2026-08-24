import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { NirogXMark } from "@/components/nirogx/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NirogX — Clinical AI Health Intelligence" },
      {
        name: "description",
        content:
          "Log in to NirogX, the clinical-grade AI health intelligence ecosystem for symptom analysis, report scanning and insights.",
      },
      { property: "og:title", content: "NirogX — Clinical AI Health Intelligence" },
      {
        property: "og:description",
        content: "Access your NirogX dashboard: AI symptom analysis, health score and report intelligence.",
      },
    ],
  }),
  component: LoginScreen,
});

function LoginScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-secondary/60 py-0 sm:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background px-6 pb-10 pt-16 sm:min-h-[860px] sm:rounded-[2.5rem] sm:shadow-lift sm:ring-1 sm:ring-border">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <NirogXMark className="size-16 rounded-[1.25rem] text-3xl" />
          <h1 className="mt-8 text-2xl font-semibold leading-snug tracking-tight">
            Welcome to NirogX
          </h1>
          <p className="mt-2 text-sm font-medium text-primary">Clinical AI Intelligence Ecosystem</p>
          <p className="mt-3 max-w-[18rem] text-sm text-muted-foreground">
            Evidence-aligned analysis of your symptoms, reports and vitals — in one secure place.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
        >
          <div className="flex rounded-full bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                  mode === m
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@clinic.com"
              className="h-12 rounded-xl bg-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="h-12 rounded-xl bg-card"
            />
          </div>

          <Button type="submit" size="lg" className="h-13 mt-1 w-full rounded-xl py-3.5 text-base">
            Access Dashboard
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            HIPAA-aligned encryption · Your data stays yours
          </p>
        </form>
      </div>
    </div>
  );
}
