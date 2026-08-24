import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Droplets,
  Footprints,
  HeartPulse,
  MessageSquareText,
  Moon,
  ScanLine,
  Stethoscope,
} from "lucide-react";
import { PhoneShell } from "@/components/nirogx/phone-shell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Home Dashboard | NirogX" },
      {
        name: "description",
        content:
          "Your NirogX home dashboard: overall health score, daily vitals, and quick clinical actions.",
      },
      { property: "og:title", content: "Home Dashboard | NirogX" },
      {
        property: "og:description",
        content: "Track your health score, vitals, and access AI health tools in NirogX.",
      },
    ],
  }),
  component: Dashboard,
});

const user = {
  name: "Aarav",
  initials: "AR",
};

const score = 88;
const steps = { current: 8432, target: 10000 };

function ScoreRing() {
  const r = 72;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 168 168" className="size-48 -rotate-90">
        <circle
          cx="84"
          cy="84"
          r={r}
          className="fill-none stroke-primary/15"
          strokeWidth="16"
        />
        <circle
          cx="84"
          cy="84"
          r={r}
          className="fill-none stroke-primary"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold tracking-tight text-foreground">{score}%</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Health Score
        </span>
      </div>
    </div>
  );
}

function StepsRing() {
  const r = 26;
  const c = 2 * Math.PI * r;
  const progress = steps.current / steps.target;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 60 60" className="size-16 -rotate-90">
        <circle cx="30" cy="30" r={r} className="fill-none stroke-secondary" strokeWidth="6" />
        <circle
          cx="30"
          cy="30"
          r={r}
          className="fill-none stroke-primary"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <Footprints className="absolute size-5 text-primary" />
    </div>
  );
}

const quickActions = [
  { icon: ScanLine, label: "Scan Reports", to: "/results" as const },
  { icon: Stethoscope, label: "Log Symptoms", to: "/symptoms" as const },
  { icon: MessageSquareText, label: "AI Chat", to: "/chat" as const },
];

const vitals = [
  {
    label: "Footsteps",
    value: `${steps.current.toLocaleString()}`,
    sub: `/ ${steps.target.toLocaleString()}`,
    icon: StepsRing,
    isCustom: true,
  },
  {
    label: "Heart Rate",
    value: "72",
    sub: "bpm",
    icon: HeartPulse,
    iconColor: "text-metric-heart",
    bgColor: "bg-metric-heart-bg",
  },
  {
    label: "Sleep Activity",
    value: "7h 15m",
    sub: "",
    icon: Moon,
    iconColor: "text-metric-sleep",
    bgColor: "bg-metric-sleep-bg",
  },
  {
    label: "Hydration",
    value: "1.5",
    sub: "L",
    icon: Droplets,
    iconColor: "text-metric-hydration",
    bgColor: "bg-metric-hydration-bg",
  },
];

function Dashboard() {
  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 pt-8">
        {/* Profile Teaser */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-13 place-items-center rounded-full border-2 border-primary bg-accent text-sm font-semibold text-accent-foreground shadow-soft">
              {user.initials}
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">Hello, {user.name}</h1>
              <Link
                to="/profile"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                View Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald/20">
            <span className="size-2 animate-pulse rounded-full bg-emerald shadow-[0_0_6px] shadow-emerald" />
            System Online
          </div>
        </header>

        {/* Overall Health Score */}
        <section className="mt-6 rounded-[1.75rem] border border-border bg-card p-6 shadow-soft">
          <div className="flex flex-col items-center">
            <ScoreRing />
            <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
              Your wellness is on track.
            </p>
          </div>
        </section>

        {/* Health Metrics Grid */}
        <section className="mt-6 grid grid-cols-2 gap-3">
          {vitals.map((vital) => (
            <article
              key={vital.label}
              className="flex aspect-square flex-col items-center justify-center rounded-[1.75rem] border border-border bg-card p-4 shadow-soft"
            >
              {vital.isCustom ? (
                <vital.icon />
              ) : (
                <div
                  className={`grid size-16 place-items-center rounded-full ${vital.bgColor} ${vital.iconColor}`}
                >
                  <vital.icon className="size-6" />
                </div>
              )}
              <p className="mt-2 text-xs font-semibold text-muted-foreground">{vital.label}</p>
              <p className="text-sm font-bold text-foreground">
                {vital.value}
                {vital.sub && (
                  <span className="text-xs font-medium text-muted-foreground">{vital.sub}</span>
                )}
              </p>
            </article>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mt-6">
          <h2 className="text-sm font-bold tracking-tight text-foreground">Quick Actions</h2>
          <div className="-mx-5 mt-3 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
            {quickActions.map(({ icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PhoneShell>
  );
}
