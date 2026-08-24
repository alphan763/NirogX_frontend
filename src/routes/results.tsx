import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Cpu, Layers, MessageSquareText } from "lucide-react";
import { PhoneShell } from "@/components/nirogx/phone-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "AI Diagnostic Prediction | NirogX" },
      {
        name: "description",
        content:
          "NirogX AI diagnostic prediction results with confidence score, model details and clinical safety disclaimer.",
      },
      { property: "og:title", content: "AI Diagnostic Prediction | NirogX" },
      {
        property: "og:description",
        content: "Review your NirogX AI prediction, confidence score and model transparency details.",
      },
    ],
  }),
  component: Results,
});

const confidence = 99.7;

const differentials = [
  { name: "Seborrheic Dermatitis", value: 0.21 },
  { name: "Fungal Infection", value: 0.06 },
  { name: "Chronic Eczema", value: 0.03 },
];

function Results() {
  return (
    <PhoneShell>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 pt-8">
        <div className="flex items-center gap-3">
          <Link
            to="/symptoms"
            className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground"
            aria-label="Back to symptom checker"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-lg font-semibold tracking-tight">Analysis Results</h1>
        </div>

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            AI Diagnostic Prediction
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary">Psoriasis</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Dermatological · matched on 3 primary markers
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-muted-foreground">Confidence Score</span>
              <span className="text-foreground">{confidence.toFixed(2)}%</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-warning/40 bg-warning-surface p-4">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 size-4.5 shrink-0 text-warning" />
            <p className="text-xs leading-relaxed text-warning-foreground">
              This system is supported by machine learning models and does not substitute
              professional medical consultation. Always confirm findings with a licensed clinician.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold tracking-tight">Differential Signals</h3>
          <ul className="mt-3 space-y-3">
            {differentials.map((d) => (
              <li key={d.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="font-medium">{d.value.toFixed(2)}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-emerald"
                    style={{ width: `${Math.max(d.value * 12, 4)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold tracking-tight">System Status</h3>
          <dl className="mt-4 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Cpu className="size-4" />
              </span>
              <div>
                <dt className="text-muted-foreground">Model</dt>
                <dd className="font-medium text-foreground">Random Forest Classifier</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Layers className="size-4" />
              </span>
              <div>
                <dt className="text-muted-foreground">Input space</dt>
                <dd className="font-medium text-foreground">132 Vector Parameters</dd>
              </div>
            </div>
          </dl>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald" />
            Inference completed in 214 ms · v2.4.1
          </div>
        </section>

        <Button asChild size="lg" className="mt-5 h-12 w-full rounded-xl text-sm">
          <Link to="/chat">
            <MessageSquareText className="size-4" />
            Discuss with NirogX AI
          </Link>
        </Button>
      </div>
    </PhoneShell>
  );
}
