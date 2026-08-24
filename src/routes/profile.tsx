import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  FileText,
  History,
  Lock,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { PhoneShell } from "@/components/nirogx/phone-shell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings | NirogX" },
      {
        name: "description",
        content:
          "Manage your NirogX profile, medical history, app settings, and privacy preferences.",
      },
      { property: "og:title", content: "Profile & Settings | NirogX" },
      {
        property: "og:description",
        content: "Your NirogX account, vitals, and HIPAA-aligned preferences.",
      },
    ],
  }),
  component: Profile,
});

const user = {
  name: "Aarav Sharma",
  email: "aarav.sharma@nirogx.health",
  initials: "AS",
};

const vitals = [
  { label: "Blood Type", value: "O+" },
  { label: "Age", value: "24" },
  { label: "Weight", value: "70 kg" },
];

const menuItems = [
  { icon: User, label: "Personal Information", to: "/profile" },
  { icon: History, label: "Medical History", to: "/profile" },
  { icon: Settings, label: "App Settings", to: "/profile" },
  { icon: Lock, label: "Privacy & Security", to: "/profile" },
];

function Profile() {
  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 pt-8">
        {/* User Identity */}
        <section className="flex flex-col items-center">
          <div className="grid size-24 place-items-center rounded-full border-4 border-primary bg-accent text-2xl font-semibold text-accent-foreground shadow-soft">
            {user.initials}
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </section>

        {/* Quick Vitals */}
        <section className="mt-6 flex justify-center gap-3">
          {vitals.map(({ label, value }) => (
            <article
              key={label}
              className="flex flex-1 flex-col items-center rounded-2xl border border-border bg-card p-3 shadow-soft"
            >
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-sm font-semibold">{value}</p>
            </article>
          ))}
        </section>

        {/* Menu List */}
        <section className="mt-6 rounded-3xl border border-border bg-card p-2 shadow-soft">
          <ul>
            {menuItems.map(({ icon: Icon, label, to }, index) => (
              <li
                key={label}
                className={index !== menuItems.length - 1 ? "border-b border-border" : ""}
              >
                <Link
                  to={to}
                  className="flex items-center justify-between rounded-2xl px-3 py-3.5 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Log Out */}
        <section className="mt-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-background py-3.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5">
            <LogOut className="size-4" />
            Log Out
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            This will end your HIPAA-aligned session.
          </p>
        </section>
      </div>
    </PhoneShell>
  );
}
