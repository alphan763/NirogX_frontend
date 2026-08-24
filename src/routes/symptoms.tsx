import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkle } from "lucide-react";
import { PhoneShell } from "@/components/nirogx/phone-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/symptoms")({
  head: () => ({
    meta: [
      { title: "Symptom Checker | NirogX" },
      {
        name: "description",
        content:
          "Select from 132 clinical symptoms and run an AI-assisted analysis with the NirogX symptom checker.",
      },
      { property: "og:title", content: "Symptom Checker | NirogX" },
      {
        property: "og:description",
        content: "Search 132 clinical symptoms and analyze them with NirogX machine learning models.",
      },
    ],
  }),
  component: SymptomChecker,
});

const symptoms = [
  "Fever", "Cough", "Fatigue", "Headache", "Chills", "Joint Pain", "Skin Rash",
  "Itching", "Nodal Skin Eruptions", "Continuous Sneezing", "Shivering", "Stomach Pain",
  "Acidity", "Vomiting", "Muscle Wasting", "Burning Micturition", "Spotting Urination",
  "Anxiety", "Cold Hands and Feet", "Mood Swings", "Weight Loss", "Restlessness",
  "Lethargy", "Patches in Throat", "Irregular Sugar Level", "High Fever", "Sunken Eyes",
  "Breathlessness", "Sweating", "Dehydration", "Indigestion", "Loss of Appetite",
  "Pain Behind Eyes", "Back Pain", "Constipation", "Abdominal Pain", "Diarrhoea",
  "Mild Fever", "Yellow Urine", "Yellowing of Eyes", "Nausea", "Blurred Vision",
  "Throat Irritation", "Redness of Eyes", "Sinus Pressure", "Runny Nose", "Congestion",
  "Chest Pain", "Weakness in Limbs", "Fast Heart Rate", "Dizziness", "Cramps",
  "Bruising", "Obesity", "Swollen Legs", "Puffy Face", "Knee Pain", "Hip Joint Pain",
  "Silver Like Dusting", "Small Dents in Nails", "Inflammatory Nails", "Blister",
  "Scurring", "Skin Peeling",
];

const preselected = ["Skin Rash", "Silver Like Dusting", "Small Dents in Nails"];

function SymptomChecker() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(preselected);

  const filtered = useMemo(
    () => symptoms.filter((s) => s.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="px-5 pb-4 pt-8">
          <h1 className="text-xl font-semibold tracking-tight">Symptom Checker</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap every symptom you're experiencing right now.
          </p>
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across 132 clinical symptoms..."
              className="h-12 rounded-xl bg-card pl-10"
              aria-label="Search symptoms"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-40">
          <div className="flex flex-wrap gap-2">
            {filtered.map((s) => {
              const active = selected.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggle(s)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs font-medium transition-all",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="py-8 text-sm text-muted-foreground">No matching symptoms found.</p>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[76px] z-10 px-4 pb-3">
          <div className="pointer-events-auto rounded-3xl border border-border bg-card p-4 shadow-lift">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selected.length} symptom{selected.length === 1 ? "" : "s"} selected
              </p>
              <button
                onClick={() => setSelected([])}
                className="text-xs font-medium text-muted-foreground hover:text-primary"
              >
                Clear
              </button>
            </div>
            <Button asChild size="lg" className="mt-3 h-12 w-full rounded-xl text-sm">
              <Link to="/results">
                <Sparkle className="size-4" />
                Analyze Symptoms (Scikit-Learn AI)
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
